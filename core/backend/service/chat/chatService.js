const ApiError = require('../../error/ApiError');
const { GroupChat, IndividualChat, ChatParticipant } = require("../../database/postqre/models/chatModel");


const chatQueries = require('../../database/postqre/queries/chatQueries');
const eventsQueries = require('../../database/mongo/queries/eventsQueries');
const inboxQueries = require('../../database/postqre/queries/inboxQueries');
const fileService = require('../misc/fileService');
const messageService = require('./messageService');
const messageQueries = require('../../database/postqre/queries/messageQueries');

const { InBox } = require('../../database/postqre/models');


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

  async createGroupChat(userId, participants, chatAvatar, chatName) {
    if (!participants)
      return ApiError.badRequest("Should be at least 1 participant ");

    if (!chatName)
      return ApiError.badRequest("Chat should have a name");

    const chat = await chatQueries.createChat("group");
    await chatQueries.createGroupChat(chat.id, chatAvatar, chatName);
    await this.addParticipantToChat(chat.id, userId, false, userId, 'ADMIN')
    await participants.forEach(async (participant) => this.addParticipantToChat(chat.id, participant, true, userId, 'USER'))
    await messageQueries.createMessage(chat.id, 'I have just created a chat. Hello guys!', userId)

    return chat;
  }

  async addParticipantToChat(chatId, participantId, eventNeeded = false, invitedId, role = 'USER') {
    const [participant, created] = await chatQueries.createParticipant(chatId, participantId, role)

    if (!created)
      throw ApiError.badRequest(`Participant ${participantId} arleady exists in ${chatId} or chat doesn't exist`);

    await inboxQueries.createInbox(chatId, participantId)

    const chat = await chatQueries.receiveChatContent(chatId,invitedId)

    if (eventNeeded) {
      await this.notifyAllUsersAboutNewParticipant(chatId, participant)
      await eventsQueries.createInvitedToChatEvent(participantId, chat.dataValues)
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

    for(var participant of participants){
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
    const chat = chatQueries.receiveChatByPk(chatId)
    for (var participant of participants) {
      await eventsQueries.createParticipantInvitedEvent(participant.userId, chat.dataValues.id, )
    }
  }

  async checkForGroupChat(chatId) {
    const chat = await chatQueries.receiveChatByPk(chatId);
    return chat.dataValues.type === 'group'
  }


}

module.exports = new ChatService()