const { Message } = require("../models/messageModel")
const { Attachement } = require('../models/attachementModel')
class MessageService {
    async fetchMessages(chatId, limit, offset) {
        return await Message.findAll({
            where: {
                chatId: chatId
            },
            include: {
                model: Attachement,
                attributes: ['type', 'url']
            },
            limit: limit,
            offset: offset,
            attributes: ['id', 'content', 'senderId', 'createdAt']
        })
    }

    async createMessage(content,attachementId,senderId,chatId) {
        return await Message.create({
            chatId: chatId,
            content: content,
            senderId: senderId,
        })
    }

}

module.exports = new MessageService()