const ApiError = require('../error/ApiError');
const { GroupChat, IndividualChat } = require("../database/postqre/models/chatModel");


const chatQueries = require('../database/postqre/queries/chatQueries');
const eventsQueries = require('../database/mongo/queries/eventsQueries');
const inboxQueries = require('../database/postqre/queries/inboxQueries');
const fileService = require('./fileService');

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

  async addParticipantToChat(chatId, participantId, eventNeeded = false) {
    const groupChat = await this.checkForGroupChat(chatId)

    if (!groupChat)
      throw ApiError.badRequest('Individual chat cannot have additional participants.')

    const [participant, created] = await chatQueries.createParticipant(chatId, participantId)

    if (!created)
      throw ApiError.badRequest(`Participant ${participantId} arleady exists in ${chatId} or chat doesn't exist`);

    if (eventNeeded) {
      await this.notifyAllUsersAboutNewParticipant(chatId, participantId)
      await eventsQueries.createChatEvent(participantId, chatId, { status: 'Invited' })
    }
  }

  async fetchChatContent(chatId, userId) {
    await this.checkForMemberingInChat(userId, chatId)
    return await chatQueries.receiveChatContent(chatId, userId)
  }

  async findChat(userId1, userId2, chatType) {
    return await chatQueries.receiveChatByParticipants(userId1, userId2, chatType)
  }

  async getChatParticipants(chatId) {
    const participants = await chatQueries.receiveParticipantsByChat(chatId)
    return participants
  }

  async updateChat(chatId, name, avatar) {
    const groupChat = await this.checkForGroupChat(chatId)
    var message = ''

    if (!groupChat)
      throw ApiError.badRequest('Chat is not group to be updated.')

    if (!name && !avatar)
      throw ApiError.badRequest(`No name or avatar has been sent for chat ${chatId} `)

    if (avatar) {
      await fileService.checkForImage(avatar.name)
      const avatarName = await fileService.saveFile(avatar, avatar.name, 'chatAvatars')
      await chatQueries.updateGroupChatAvatar(chatId, avatarName)

      message +=  'avatar [' + avatar.name + ' ], '
    }

    if (name) {
      await chatQueries.updateGroupChatName(chatId, name)

      message += 'name [' + name + ' ],'
    }

    return message
  }

  async destroyParticipantFromChat(chatId, participantId) {
    const groupChat = await this.checkForGroupChat(chatId)

    if (!groupChat)
      throw ApiError.badRequest('Chat have to be group to destroy participants.')

    const destroyedParticipant = await chatQueries.destroyParticipant(chatId, participantId)

    if (destroyedParticipant === 0) {
      throw ApiError.badRequest(`Participant ${participantId} doesn't exist in chat ${chatId}`);
    }

    await eventsQueries.createChatEvent(participantId, chatId, { status: 'Kicked' })
  }

  async checkForMemberingInChat(userId, chatId) {
    const participants = await this.getChatParticipants(chatId)
    const participant = participants.find((participant) => participant.userId === userId);
    if (!participant) {
      throw ApiError.forbidden(`You are not participant of chat ${chatId}`)
    }
  }

  async notifyAllUsersAboutNewParticipant(chatId, participantId) {
    const participants = await chatQueries.receiveParticipantsByChat(chatId)

    for (var participant of participants) {
      await eventsQueries.createChatEvent(participant.userId, chatId, "New Participant", participantId, false)
    }
  }

  async checkForGroupChat(chatId) {
    const chat = await chatQueries.receiveChatByPk(chatId);
    return chat.type === 'group'
  }


}

module.exports = new ChatService()