const { Attachement } = require("../models/attachementModel")
const { Message } = require("../models/messageModel")

const { Sequelize } = require("../postgre")

class attachementsQueries {
    async receiveAll(chatId, limit, offset) {
        return await Message.findAndCountAll({
            where: {
                chatId: chatId,
                '$attachement$': {
                    [Sequelize.Op.ne]: null
                }
            },
            include: {
                model: Attachement,
                attributes: ['id', 'type', 'url','messageId']
            },
            limit: limit,
            offset: offset,
            attributes: ['id','chatId']
        })
    }

    async receiveOne(attachementId) {
        return await Attachement.findByPk(attachementId)
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