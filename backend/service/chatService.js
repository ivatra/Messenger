const ApiError = require('../error/ApiError');
const { GroupChat, IndividualChat } = require("../database/postqre/models/chatModel");


const chatQueries = require('../database/postqre/queries/chatQueries');
const eventsQueries = require('../database/mongo/queries/eventsQueries');
const inboxQueries = require('../database/postqre/queries/inboxQueries');

class ChatService {
  async createChat(userId, userId2, chatType) {
    if (chatType !== "group" && chatType !== "individual") {
      return ApiError.badRequest("Incorrect chat type ")
    }

    if (chatType === "individual" && !userId2)
      return ApiError.badRequest("Second user is absent")

    const chat = await chatQueries.createChat(chatType)

    const chatModel = chatType === "group" ? GroupChat : IndividualChat
    await chatQueries.createChatModel(chatModel, chat.id)

    await this.createSubTables(chat.id, userId, userId2)

    return chat
  }

  async createSubTables(chatId, userId, userId2) {
    await this.addParticipantToChat(chatId, userId)
    await inboxQueries.createInbox(chatId, userId)
    if (userId2) {
      await inboxQueries.createInbox(chatId, userId2)
      await this.addParticipantToChat(chatId, userId2, true)
    }
  }

  async findChat(userId1, userId2, chatType) {
    return await chatQueries.receiveChatByParticipants(userId1, userId2, chatType)
  }

  async addParticipantToChat(chatId, participantId, eventNeeded = false) {
    const [participant, created] = await chatQueries.createParticipant(chatId, participantId)

    if (!created)
      throw ApiError.badRequest(`Participant ${participantId} arleady exists in ${chatId} or chat doesn't exist`);

    const chat = await chatQueries.receiveChatByPk(chatId)
    if (eventNeeded && chat.type === 'group')
      await eventsQueries.createChatEvent(participantId, chatId, { status: 'Invited' })
  }

  async destroyParticipantFromChat(chatId, participantId) {
    const chat = await chatQueries.receiveChatByPk(chatId);

    if (chat.type === 'group') {
      const destroyedParticipant = await chatQueries.destroyParticipant(chatId, participantId)

      if (destroyedParticipant === 0) {
        throw ApiError.badRequest(`Participant ${participantId} doesn't exist in chat ${chatId}`);
      }
    }

    await eventsQueries.createChatEvent(participantId, chatId, { status: 'Kicked' })
  }

  async fetchChatContent(chatId, userId) {
    await this.checkForMemberingInChat(userId,chatId)
    return await chatQueries.receiveChatContent(chatId, userId)
  }

  async checkForMemberingInChat(userId, chatId) {
    const participants = await this.getChatParticipants(chatId)
    const participant = participants.find((participant) => participant.userId === userId);
    if (!participant) {
       throw ApiError.forbidden(`You are not participant of chat ${chatId}`)
    }
  }

  async getChatParticipants(chatId) {
    const chat = await chatQueries.receiveParticipants(chatId)
    return chat.participants
  }

}

module.exports = new ChatService()