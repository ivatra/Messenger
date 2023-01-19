const { Attachement } = require("../models/attachementModel")
const { Message } = require("../models/messageModel")

const { Sequelize } = require("../postgre")

class attachementsQueries {
    async receiveAll(chatId, limit, offset) {
        return await Message.findAll({
            where: {
                chatId: chatId,
                '$attachement$': {
                    [Sequelize.Op.ne]: null
                }
            },
            include: {
                model: Attachement,
                attributes: ['id', 'type', 'url']
            },
            limit: limit,
            offset: offset,
            attributes: ['id', 'createdAt', 'senderId']
        })
    }

    async receiveOne(chatId, attachementId) {
        return await Message.findOne({
            where: {
                chatId: chatId,
                '$attachement.id$': attachementId
            },
            include: {
                model: Attachement,
                attributes: ['type', 'url']
            },
            attributes: ['id', 'content', 'createdAt', 'senderId'],
        })
    }

    async create(type, url, messageId) {
        return await Attachement.create({
            type: type,
            url: url,
            messageId: messageId
        })
    }

    async receiveByMessage(messageId) {
        return await Attachement.findOne({
            where: {
                messageId: messageId
            }
        })
    }
}

module.exports = new attachementsQueries()