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
const inBoxService = require('../pages/inBoxService');


async function filterChatParticipants(chat, firstUser, secondUser) {
  return chat
    .filter(chat => chat.participants.some(p => p.userId === firstUser))
    .filter(chat => chat.participants.some(p => p.userId === secondUser))
}


function proceedChatContent(chat) {
  const superParts = chat.participants.map((part) => {
    part.dataValues.userId = part.user.id
    delete part.dataValues['user']
    return { [part.id]: part.dataValues }
  })

  const newChat = { ...chat }
  newChat.dataValues.participants = superParts
  return newChat

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

    const newChat = await chatQueries.receiveChatContent(chat.id, userId)
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

    for (var partId of participantsIds) {
      await this.addParticipantToChat(chat.id, partId, true, userId, 'USER')
    }

    await messageQueries.createMessage(chat.id, 'I have just created a chat. Hello guys!', userId)

    const chato = await chatQueries.receiveChatContent(chat.id, userId);
    const newChato = proceedChatContent(chato)
    return { ...newChato.dataValues, ...newChato.dataValues.groupChat.dataValues, role: 'ADMIN' }
  }

  async addParticipantToChat(chatId, userId, eventNeeded = false, invitedId, role = 'USER') {
    const [participant, created] = await chatQueries.createParticipant(chatId, userId, role)

    if (!created)
      throw ApiError.badRequest(`Participant ${userId} arleady exists in ${chatId} or chat doesn't exist`);

    await inboxQueries.createInbox(chatId, userId)

    const inbox = await inBoxService.getByChat(userId, chatId)
    console.log(participant)
    if (eventNeeded) {
      await this.notifyAllUsersAboutNewParticipant(chatId, participant, invitedId)
      await eventsQueries.createInvitedToChatEvent(userId, inbox, invitedId)
    }

    return participant
  }

  async fetchChatContent(chatId, userId) {
    const participant = await this.checkForMemberingInChat(userId, chatId)
    const oldChat = await chatQueries.receiveChatContent(chatId, userId)
    const chat = proceedChatContent(oldChat)
    if (chat.groupChat) {
      return { ...chat.dataValues, ...chat.dataValues.groupChat.dataValues, role: participant.role }
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

  async destroyParticipantFromChat(chatId, participantId, destroyerId) {
    const groupChat = await this.checkForGroupChat(chatId)

    if (!groupChat)
      throw ApiError.badRequest('Chat have to be group to destroy participants.')

    const part = await ChatParticipant.findByPk(participantId)

    const destroyedParticipant = await chatQueries.destroyParticipant(participantId)

    if (destroyedParticipant === 0) {
      throw ApiError.badRequest(`Participant ${participantId} doesn't exist in chat ${chatId}`);
    }


    const inbox = await inboxQueries.receiveInboxByChatId(part.userId, chatId)

    await inboxQueries.destroyInbox(chatId, part.userId)
    await ChatParticipant.destroy({ where: { id: participantId } })

    const participants = await chatQueries.receiveParticipantsByChat(chatId)

    for (var participant of participants) {
      await eventsQueries.createParticipantRemovedEvent(participant.user.id, chatId, participantId, destroyerId)
    }
    await eventsQueries.createExcludedFromChatEvent(part.userId, inbox.dataValues.id, destroyerId)
  }

  async checkForMemberingInChat(userId, chatId) {
    const participants = await chatQueries.receiveParticipantsByChat(chatId)

    const participant = participants.find((participant) => participant.userId === userId);
    if (!participant) {
      throw ApiError.forbidden(`You are not participant of chat ${chatId}`)
    }
    return participant
  }

  async notifyAllUsersAboutNewParticipant(chatId, participant, inviterId) {
    const participants = await chatQueries.receiveParticipantsByChat(chatId)
    console.log(participant.dataValues)
    const partData = {
      id:participant.dataValues.id,
      role: participant.dataValues.role,
      userId: participant.dataValues.userId,
    }
    for (var participant of participants) {
      await eventsQueries.createParticipantInvitedEvent(participant.userId, chatId, partData, inviterId)
    }
  }

  async checkForGroupChat(chatId) {
    const chat = await chatQueries.receiveChatByPk(chatId);
    return chat.dataValues.type === 'group'
  }


}

module.exports = new ChatService()