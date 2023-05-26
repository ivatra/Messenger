const ApiError = require('../../error/ApiError');


const chatQueries = require('../../database/postqre/queries/chatQueries');
const eventsQueries = require('../../database/mongo/queries/eventsQueries');
const inboxQueries = require('../../database/postqre/queries/inboxQueries');

const fileService = require('../misc/fileService');
const messageService = require('./messageService');
const messageQueries = require('../../database/postqre/queries/messageQueries');

const {ChatParticipant,Chat,GroupChat,IndividualChat} = require('../../database/postqre/models/chatModel')
const { InBox } = require('../../database/postqre/models');
const contactsService = require('../pages/contactsService');
const { validateAndSaveAvatar } = require('../userService');


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
    
    for(var partId of participantsIds){
      await this.addParticipantToChat(chat.id, partId, true, userId, 'USER')
    }
    await messageQueries.createMessage(chat.id, 'I have just created a chat. Hello guys!', userId)

    return await chatQueries.receiveChatContent(chat.id,userId);
  }

  async addParticipantToChat(chatId, participantId, eventNeeded = false, invitedId, role = 'USER') {
    const [participant, created] = await chatQueries.createParticipant(chatId, participantId, role)
    if (!created)
      throw ApiError.badRequest(`Participant ${participantId} arleady exists in ${chatId} or chat doesn't exist`);

    await inboxQueries.createInbox(chatId, participantId)

    const chat = await chatQueries.receiveChatContent(chatId, invitedId)

    const part = await contactsService.getContact(invitedId,participantId)

    if (eventNeeded) {
      await this.notifyAllUsersAboutNewParticipant(chatId, part)
      await eventsQueries.createInvitedToChatEvent(participantId, chat.dataValues,invitedId)
    }
  }

  async fetchChatContent(chatId, userId) {
    await this.checkForMemberingInChat(userId, chatId)
    return await chatQueries.receiveChatContent(chatId, userId)
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
    for ( var part of participants) {
      await eventsQueries.createChatUpdatedEvent(part.user.id, chat.groupChat.name, chat.groupChat.avatar, +chatId)
    }
    return 'Chat succesfuly updated'
  }

  async destroyParticipantFromChat(chatId, participantId, destroyerId) {
    const groupChat = await this.checkForGroupChat(chatId)

    if (!groupChat)
      throw ApiError.badRequest('Chat have to be group to destroy participants.')

    const destroyedParticipant = await chatQueries.destroyParticipant(chatId, participantId)

    if (destroyedParticipant === 0) {
      throw ApiError.badRequest(`Participant ${participantId} doesn't exist in chat ${chatId}`);
    }
    const chat = await chatQueries.receiveChatByPk(chatId)
    await InBox.destroy({ chatId: chatId, userId: participantId })
    await ChatParticipant.destroy({ chatId: chatId, participantId: participantId })

    const participants = await chatQueries.receiveParticipantsByChat(chatId)

    for (var participant of participants) {
      await eventsQueries.createParticipantRemovedEvent(participant.user.id, chatId, participantId, destroyerId)
    }

    await eventsQueries.createExcludedFromChatEvent(participantId, chat.dataValues.id, destroyerId)
  }

  async checkForMemberingInChat(userId, chatId) {
    const participants = await chatQueries.receiveParticipantsByChat(chatId)

    const participant = participants.find((participant) => participant.userId === userId);
    if (!participant) {
      throw ApiError.forbidden(`You are not participant of chat ${chatId}`)
    }
  }

  async notifyAllUsersAboutNewParticipant(chatId, participant) {
    const participants = await chatQueries.receiveParticipantsByChat(chatId)
    for (var participant of participants) {
      await eventsQueries.createParticipantInvitedEvent(participant.userId, chatId,)
    }
  }

  async checkForGroupChat(chatId) {
    const chat = await chatQueries.receiveChatByPk(chatId);
    return chat.dataValues.type === 'group'
  }


}

module.exports = new ChatService()