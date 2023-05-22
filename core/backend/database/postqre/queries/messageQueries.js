const { Sequelize } = require("../postgre")
const { Op } = require('sequelize')

const { Attachement } = require("../models/attachementModel")
const { Message, MessageVector, MessageMeta } = require("../models/messageModel")
const { User } = require("../models/userModel")

class messageQueries {
    async createMessage(chatId, content, senderId) {
        return await Message.create({
            chatId: chatId,
            content: content,
            senderId: senderId,
        })
    }

    async createMessageVector(messageId, contentCopy) {
        return await MessageVector.create({
            messageId: messageId,
            contentCopy: contentCopy
        })
    }

    async createMessageMeta(messageId, userId, isMentioned) {
        return await MessageMeta.create({
            messageId,
            userId,
            isMentioned
        })
    }



    async receiveMessage(messageId) {
        return await Message.findOne({
            where: {
                id: messageId,
            }, include: [{
                model: Attachement,
                attributes: ['type', 'url',]
            }, {
                model: MessageMeta,
            }]
        })
    }

    async updateMessage(messageId, values) {
        return await Message.update(values, {
            where: {
                id: messageId
            }
        })
    }

    async updateMessageMetaRead(messageId,userId){
        return await MessageMeta.update({isRead:true},{
            where:{
                userId,
                messageId
            }
        })
    }

    async markMessageRead(startMessageId) {
        const message = await Message.findByPk(startMessageId)

        return await Message.update({ isRead: true }, {
            where: {
                isRead: false,
                chatId: message.dataValues.chatId,
                index: {
                    [Op.gt]: message.dataValues.index
                }
            }
        })
    }
    async receiveByChat(chatId, userId, limit, offset) {
        return await Message.findAndCountAll({
            where: {
                chatId: chatId
            },
            include: [
                {
                    model: Attachement,
                    attributes: ['id', 'type', 'url']
                },
            ],
            attributes: [
                'id',
                'content',
                'senderId',
                'createdAt',
                'isRead',
                'updatedAt',
                'index'
            ],
            limit: limit,
            offset: offset,
            order: [['id', 'DESC']]
        });
    }

    async receiveMessagesIdsThatSatisfyMessage(chatsWhereUserIn, likeMessage, plainMessage) {
        return await Message.findAll({
            attributes: ["id", 'chatId'],
            where: {
                chatId: {
                    [Sequelize.Op.in]: chatsWhereUserIn //
                }
            },
            include: [{
                model: MessageVector,
                attributes: ['id'],
                where: {
                    contentCopy: {
                        [Sequelize.Op.like]: likeMessage,
                    },
                },
            },],
            order: [
                [
                    Sequelize.literal(`ts_rank(to_tsvector("messages_vector"."contentCopy"), 
      plainto_tsquery('${plainMessage}'))`),
                    "DESC"],
            ],
        });
    }
}

module.exports = new messageQueries()