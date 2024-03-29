const ApiError = require('../../error/ApiError');


const chatQueries = require('../../database/postqre/queries/chatQueries');
const eventsQueries = require('../../database/mongo/queries/eventsQueries');
const inboxQueries = require('../../database/postqre/queries/inboxQueries');

const fileService = require('../misc/fileService');
const messageService = require('./messageService');
const messageQueries = require('../../database/postqre/queries/messageQueries');

const { ChatParticipant, Chat, GroupChat, IndividualChat } = require('../../database/postqre/models/chatModel')
const { InBox } = require('../../database/postqre/models');
const contactsService = require('../pages/contactsService');
const { validateAndSaveAvatar } = require('../userService');
const userQueries = require('../../database/postqre/queries/userQueries');
const { User } = require('../../database/postqre/models/userModel');


async function filterChatParticipants(chat, firstUser, secondUser) {
  return chat
    .filter(chat => chat.participants.some(p => p.userId === firstUser))
    .filter(chat => chat.participants.some(p => p.userId === secondUser))
}

class ChatService {
  async createIndividualChat(userId, userId2) {
    if (!userId2) {
      return ApiError.badRequest("Second user is absent");
    }
    const chat = await chatQueries.createChat("individual");
    await chatQueries.createIndividuaChat(chat.id);

    await this.addParticipantToChat(chat.id, userId, false, userId, 'ADMIN')
    await this.addParticipantToChat(chat.id, userId2, false, userId, 'USER')

    await messageQueries.createMessage(chat.id, 'I have just created a chat. Hello guys! - ', userId)

    return chat;
  }

  async createGroupChat(userId, participantsIds, chatAvatar, chatName) {
    participantsIds = JSON.parse(participantsIds)

    if (!participantsIds)
      throw ApiError.badRequest("Should be at least 1 participant");
    if (!chatName)
      throw ApiError.badRequest("Chat should have a name");

    if (chatAvatar) {
      chatAvatar = await validateAndSaveAvatar(chatAvatar);
    }

    const chat = await chatQueries.createChat("group");
    await chatQueries.createGroupChat(chat.id, chatAvatar, chatName);

    await this.addParticipantToChat(chat.id, userId, false, userId, 'ADMIN')

    await messageQueries.createMessage(chat.id, 'I have just created a chat. Hello guys!', userId)

    for (var partId of participantsIds) {
      await this.addParticipantToChat(chat.id, partId, true, userId, 'USER')
    }

    const chato = await chatQueries.receiveChatContent(chat.id, userId);
    return { ...chato.dataValues, ...{ groupChat: { ...chato.dataValues.groupChat.dataValues, role: 'ADMIN' } } }
  }

  async fetchChatContent(chatId, userId) {
    const participant = await this.checkForMemberingInChat(userId, chatId)
    const chat = await chatQueries.receiveChatContent(chatId, userId)
    if (chat.groupChat) {
      return { ...chat.dataValues, ...{ groupChat: { ...chat.dataValues.groupChat.dataValues, role: participant.role } } }

    } else {
      return chat
    }
  }

  async findChat(userId1, userId2, chatType) {
    const chats = await chatQueries.receiveChatByParticipants(userId1, userId2, chatType)
    return filterChatParticipants(chats, userId1, userId2)
  }

  async updateChat(chatId, name, avatar) {
    const isGroupChat = await this.checkForGroupChat(chatId)

    if (!isGroupChat)
      throw ApiError.badRequest('Chat is not group to be updated.')

    if (!name && !avatar)
      throw ApiError.badRequest(`No name or avatar has been sent for chat ${chatId} `)

    if (avatar) {
      await fileService.checkForImage(avatar.name)
      const avatarName = await fileService.saveFile(avatar, avatar.name, 'chatAvatars')
      await chatQueries.updateGroupChatAvatar(chatId, avatarName)
    }

    if (name) {
      await chatQueries.updateGroupChatName(chatId, name)
    }

    const participants = await chatQueries.receiveParticipantsByChat(chatId)
    const chat = await chatQueries.receiveChatContent(chatId)
    for (var part of participants) {
      await eventsQueries.createChatUpdatedEvent(part.user.id, chat.groupChat.name, chat.groupChat.avatar, +chatId)
    }
    return 'Chat succesfuly updated'
  }

  async addParticipantToChat(chatId, participantId, eventNeeded = false, invitedId, role = 'USER') {

    console.log(participantId, chatId)
    if (!chatId || !participantId) {
      throw ApiError.badRequest('ChatId or participantId is absent')
    }
    const [participant, created] = await chatQueries.createParticipant(chatId, participantId, role)

    if (!created)
      throw ApiError.badRequest(`Participant ${participantId} arleady exists in ${chatId} or chat doesn't exist`);


    const {rows,count} = await messageQueries.receiveByChat(chatId, participantId, 1, 0)
    await inboxQueries.createInbox(chatId, participantId,rows[0] ? rows[0].id : undefined)

    const chat = await chatQueries.receiveChatContent(chatId, invitedId)

    const contact = await contactsService.getContact(invitedId, participantId)

    const merged = { ...participant.dataValues, isTyping: false, user: contact }
    if (eventNeeded) {
      await this.notifyAllUsersAboutNewParticipant(chatId, merged, invitedId)
      await eventsQueries.createInvitedToChatEvent(participantId, chat.dataValues, invitedId)
    }

    return merged
  }

  async destroyParticipantFromChat(chatId, participantId, destroyerId) {
    const groupChat = await this.checkForGroupChat(chatId)

    if (!groupChat)
      throw ApiError.badRequest('Chat have to be group to destroy participants.')

    const currPart = await ChatParticipant.findByPk(participantId)

    if (!currPart) {
      throw ApiError.badRequest('Participant was not found')
    }

    const destroyedParticipant = await chatQueries.destroyParticipant(participantId)

    if (destroyedParticipant === 0) {
      throw ApiError.badRequest(`Participant ${participantId} doesn't exist in chat ${chatId}`);
    }

    const chat = await chatQueries.receiveChatByPk(chatId)


    await inboxQueries.destroyInboxByChatIdAndUser(chatId, currPart.userId)

    await ChatParticipant.destroy({ where: { chatId: chatId, userId: currPart.userId } })

    const participants = await chatQueries.receiveParticipantsByChat(chatId)

    for (var participant of participants) {
      await eventsQueries.createParticipantRemovedEvent(participant.user.id, chatId, participantId, currPart.userId, destroyerId)
    }

    await eventsQueries.createExcludedFromChatEvent(currPart.userId, chat.dataValues.id, destroyerId)
  }

  async checkForMemberingInChat(userId, chatId) {
    const participants = await chatQueries.receiveParticipantsByChat(chatId)

    const participant = participants.find((participant) => participant.userId === userId);
    if (!participant) {
      throw ApiError.forbidden(`You are not participant of chat ${chatId}`)
    }
    return participant
  }

  async notifyAllUsersAboutNewParticipant(chatId, part, inviterId) {
    const participants = await chatQueries.receiveParticipantsByChat(chatId)
    for (var participant of participants) {
      await eventsQueries.createParticipantInvitedEvent(participant.userId, chatId, part, inviterId)
    }
  }

  async checkForGroupChat(chatId) {
    const chat = await chatQueries.receiveChatByPk(chatId);
    return chat.dataValues.type === 'group'
  }


}

module.exports = new ChatService()