const { Chat ,GroupChat,IndividualChat,ChatParticipant} = require("../models/chatModel");
const { InBox } = require("../models/inBoxModel");
const { Message } = require("../models/messageModel");
const { User } = require("../models/userModel");
const { Sequelize } = require("../postgre");

class inBoxQueries {
  async createInbox(chatId, userId) {
    return await InBox.create({ chatId: chatId, userId: userId })
  }

  async receiveUserInboxes(userId) {
    return await InBox.findAll({
      where: { userId: userId },
      include: [
        { model: Message, attributes: ['content', 'senderId'] },
        {
          model: Chat,
          attributes: ['type'],
          include: [
            {
              model: GroupChat,
              attributes: ['name', 'avatar'],
            },
            {
              model: IndividualChat,
              attributes: ['isActive'],
            },
            {
              model: ChatParticipant,
              attributes: ['userId'],
              as: 'participants',
              required:false,
              where: {
                userId: { [Sequelize.Op.ne]: userId },
                "$chat.type$":'individual'
              },
              include: [
                {
                  model: User,
                  attributes: ['avatar', 'name', 'lastSeen'],
                }
              ]
            }]
        }]
    });
  }

    updateMessage(userId, chatId, messageId) {
    return InBox.update({ messageId: messageId },
      {
        where: {
          userId,
          chatId
        }
      })
  }
}

module.exports = new inBoxQueries()