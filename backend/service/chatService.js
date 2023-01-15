const ApiError = require('../error/ApiError');
const { User, InBox } = require('../models')
const { Sequelize } = require('sequelize')
const { Chat, GroupChat, IndividualChat, ChatParticipant } = require('../models/chatModel');

const eventCreator = require('../events/eventCreator');
const mongoClient = require('../mongo');

class ChatService {
  async createChat(userId, userId2, chatType) {
    if (chatType !== "group" && chatType !== "individual") {
      return ApiError.badRequest("Incorrect chat type ")
    }

    if (chatType === "individual" && !userId2)
      return ApiError.badRequest("Second user is absent")

    const chat = await Chat.create({ type: chatType })

    const chatModel = chat.type === "group" ? GroupChat : IndividualChat
    await chatModel.create({ chatId: chat.id })

    await this.createSubTables(chat.id, userId, userId2)

    return chat
  }

  async createChatEvent(userId, chat, status) {
    const event = eventCreator.createChatEvent(userId, chat, status)
    const events = mongoClient.db('Messenger').collection('events');
    await events.insertOne(event)
  }

  async createSubTables(chatId, userId, userId2) {
    await this.addParticipantToChat(chatId, userId)
    await InBox.create({ chatId: chatId, userId: userId })
    if (userId2) {
      await InBox.create({ chatId: chatId, userId: userId2 })
      await this.addParticipantToChat(chatId, userId2, true)
    }
  }

  async findChat(userId1, userId2, chatType) {
    return await Chat.findAll({
      where: {
        '$participants.userId$': userId1,
        '$participants.userId$': userId2,
        type: chatType
      },
      attributes: ['id'],
      include: [
        {
          model: ChatParticipant,
          as: 'participants',
          attributes: ['userId']
        }
      ],
    });
  }
  async addParticipantToChat(chatId, participantId, eventNeeded = false) {
    const [participant, created] = await ChatParticipant.findOrCreate({
      where: {
        chatId: chatId,
        userId: participantId
      }
    });

    if (!created)
      throw ApiError.badRequest(`Participant ${participantId} arleady exists in ${chatId} or chat doesn't exist`);

    const chat = await Chat.findByPk(chatId)
    if (eventNeeded && chat.type === 'group')
      await this.createChatEvent(participantId, chat.dataValues, 'Invited')
  }

  async destroyParticipantFromChat(chatId, participantId) {
    const chat = await Chat.findByPk(chatId);

    if (chat.type === 'group') {
      const destroyedParticipant = await ChatParticipant.destroy({
        where: { chatId, userId: participantId },individualHooks:true
      });
      
      if (destroyedParticipant === 0) {
        throw ApiError.badRequest(`Participant ${participantId} doesn't exist in chat ${chatId}`);
      }
    }

    await this.createChatEvent(participantId, chat.dataValues, 'Kicked');
  }

  async fetchChatContent(chatId, userId) {
    return await Chat.findByPk(chatId, {
      attributes: ['id', 'type'],
      include: [{
        model: ChatParticipant,
        as: 'participants',
        include: [{
          model: User,
          attributes: ['id', 'name', 'avatar', 'isActive', 'lastSeen'],
          where: {
            id: {
              [Sequelize.Op.ne]: userId
            }
          }
        }],
        attributes: ['role']
      },
      {
        model: GroupChat,
        attributes: ['avatar', 'name', 'participiantsCount']
      }, {
        model: IndividualChat,
        attributes: ['isActive']
      }],
    });
  }

}

module.exports = new ChatService()