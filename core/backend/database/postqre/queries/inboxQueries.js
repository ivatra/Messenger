const { Op } = require('sequelize')
const { Sequelize } = require("../postgre")

const { Chat, GroupChat, IndividualChat, ChatParticipant } = require("../models/chatModel");
const { InBox } = require("../models/inBoxModel");
const { Message } = require("../models/messageModel");
const { User, UserVector } = require("../models/userModel");

class inBoxQueries {
  async createInbox(chatId, userId) {
    return await InBox.create({ chatId: chatId, userId: userId })
  }

  async receiveUserInboxes(userId) {
    return await InBox.findAll({
      where: { userId: userId },
      attributes: ['id', 'countUnreadMsgs', 'isPinned'],
      include: [
        {
          model: Message,
          attributes: ['id','content', 'senderId', 'createdAt']
        },
        {
          model: Chat,
          attributes: ['id','type'],
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

              as: 'participants',
              required: false,
              where: {
                userId: { [Sequelize.Op.ne]: userId },
                "$chat.type$": 'individual'
              },
              include: [
                {
                  model: User,
                  attributes: ['id','avatar', 'name', 'lastSeen'],
                }
              ],
              attributes: ['role', 'isTyping'],
            }]
        }],
      order: [[{ model: Message }, 'createdAt', 'DESC']]
    });
  }

  async receiveUserInboxesByInboxesList(userId,inboxesIds) {
    return await InBox.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: inboxesIds
        },
        userId:{
          [Sequelize.Op.ne]:userId
        }
      },
      include: [
        {
          model: Message,
          attributes: ['content', 'senderId', 'createdAt'],
        },
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
              required: false,
              where: {
                "$chat.type$": 'individual'
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
  async receiveInboxesWhichSatisfyMessage(chatsWhereUserIn, plainMessage, likeMessage){
    return await InBox.findAll({
      where: {
        chatId: {
          [Op.in]: chatsWhereUserIn
        }
      },
      attributes: ['id'],
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
          include: [
            {
              model: UserVector,
              attributes: ['nameCopy', "loginCopy"],
              where: {
                [Op.or]: [
                  {
                    nameCopy: {
                      [Op.like]: likeMessage
                    }
                  },
                  {
                    loginCopy: {
                      [Op.like]: likeMessage
                    }
                  }
                ]
              }
            }
          ]
        }
      ],
      order: [
        [
          Sequelize.literal(`ts_rank(to_tsvector("user"."name"), 
  plainto_tsquery('${plainMessage}'))`),
          'DESC'
        ],
        [
          Sequelize.literal(`ts_rank(to_tsvector("user"."login"), 
  plainto_tsquery('${plainMessage}'))`),
          'DESC'
        ],
      ],
      limit: 10,
    });
  }
  
  async updateMessage(userId, chatId, messageId) {
    return await InBox.update({ messageId: messageId },
      {
        where: {
          userId,
          chatId
        }
      })
  }
}

module.exports = new inBoxQueries()