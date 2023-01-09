const { Sequelize } = require('../db');
const { Attachement, Message, User } = require('../models');

class AttachementService {
    async fetchAll(chatId, limit, offset) {
        return await Message.findAll({
            where: {
                chatId: chatId,
                '$attachement$':{
                    [Sequelize.Op.ne]:null
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

    async fetchOne(chatId, attachementId) {
        return await Message.findOne({
            where: {
                chatId: chatId,
                '$attachement.id$':attachementId
                },
            include: {
                model: Attachement,
                attributes: ['type', 'url']
            },
            attributes: ['id', 'content', 'createdAt', 'senderId'],
    })}

    async create(type, url,messageId) {
        return await Attachement.create({
            type: type,
            url: url,
            messageId:messageId
        })
    }

}

module.exports = new AttachementService()