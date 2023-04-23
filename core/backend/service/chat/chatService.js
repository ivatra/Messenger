const ApiError = require('../../error/ApiError');
const { GroupChat, IndividualChat } = require("../../database/postqre/models/chatModel");


const chatQueries = require('../../database/postqre/queries/chatQueries');
const eventsQueries = require('../../database/mongo/queries/eventsQueries');
const inboxQueries = require('../../database/postqre/queries/inboxQueries');
const fileService = require('../misc/fileService');
const messageService = require('./messageService');
const messageQueries = require('../../database/postqre/queries/messageQueries');


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
    await this.createSubTables(chat.id, userId, userId2);

    return chat;
  }

  async createGroupChat(userId, participants, chatAvatar, chatName) {
    if (!participants)
      return ApiError.badRequest("Should be at least 1 participant ");

    if (!chatName)
      return ApiError.badRequest("Chat should have a name");

    const chat = await chatQueries.createChat("group");
    await chatQueries.createGroupChat(chat.id, chatAvatar, chatName);
    await this.addParticipantToChat(chat.id, userId, false, null, 'ADMIN')
    await participants.forEach(async (participant) => this.addParticipantToChat(chat.id, participant.id, true, userId, 'USER'))
    await messageQueries.createMessage(chat.id, 'I have just created a chat. Hello guys!', userId)
    return chat;
  }

  async createSubTables(chatId, userId, userId2) {
    await this.addParticipantToChat(chatId, userId, false, null, 'ADMIN')
    await inboxQueries.createInbox(chatId, userId)
    if (userId2) {
      await inboxQueries.createInbox(chatId, userId2)
      await this.addParticipantToChat(chatId, userId2, true, userId, 'USER')
    }
  }

  async addParticipantToChat(chatId, participantId, eventNeeded = false, invitedId = null, role = 'USER') {
    // const groupChat = await this.checkForGroupChat(chatId)

    // if (!groupChat)
    //   throw ApiError.badRequest('Individual chat cannot have additional participants.')

    const [participant, created] = await chatQueries.createParticipant(chatId, participantId, role)

    if (!created)
      throw ApiError.badRequest(`Participant ${participantId} arleady exists in ${chatId} or chat doesn't exist`);

    await inboxQueries.createInbox(chatId, participantId)

    if (eventNeeded) {
      await this.notifyAllUsersAboutNewParticipant(chatId, participantId)
      await eventsQueries.createChatEvent(participantId, chatId, 'Invited', invitedId, true)
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
    const groupChat = await this.checkForGroupChat(chatId)
    var message = ''

    if (!groupChat)
      throw ApiError.badRequest('Chat is not group to be updated.')

    if (!name && !avatar)
      throw ApiError.badRequest(`No name or avatar has been sent for chat ${chatId} `)

    if (avatar) {
      console.log(avatar)
      await fileService.checkForImage(avatar.name)
      const avatarName = await fileService.saveFile(avatar, avatar.name, 'chatAvatars')
      await chatQueries.updateGroupChatAvatar(chatId, avatarName)

      message += 'avatar [' + avatar.name + ' ], '
    }

    if (name) {
      await chatQueries.updateGroupChatName(chatId, name)

      message += 'name [' + name + ' ],'
    }

    return message
  }

  async destroyParticipantFromChat(chatId, participantId, destroyedId) {
    const groupChat = await this.checkForGroupChat(chatId)

    if (!groupChat)
      throw ApiError.badRequest('Chat have to be group to destroy participants.')

    const destroyedParticipant = await chatQueries.destroyParticipant(chatId, participantId)

    if (destroyedParticipant === 0) {
      throw ApiError.badRequest(`Participant ${participantId} doesn't exist in chat ${chatId}`);
    }

    await eventsQueries.createChatEvent(participantId, chatId, 'Kicked', destroyedId)
  }

  async checkForMemberingInChat(userId, chatId) {
    const participants = await chatQueries.receiveParticipantsByChat(chatId)
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