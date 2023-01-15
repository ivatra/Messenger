const { Message } = require("../models/messageModel")
const { Attachement } = require('../models/attachementModel')

const mongoClient = require('../mongo');
class MessageService {
    async fetchMessages(chatId, limit, offset) {
        const events = mongoClient.db('Messenger').collection('events');
        const messages = await Message.findAll({
            where: {
                chatId: chatId
            },
            include: {
                model: Attachement,
                attributes: ['type', 'url']
            },
            limit: limit,
            offset: offset,
            attributes: ['id', 'content', 'senderId', 'createdAt','isRead']
        })

        await Promise.all(messages.map(async (message) => {
            const result = await events.findOne({
                type: 'Message', message: {
                    id: 131
                }
            })
            console.log(result)
        }))
        return messages
    }

    async createMessage(content, attachementId, senderId, chatId) {
        return await Message.create({
            chatId: chatId,
            content: content,
            senderId: senderId,
        })
    }

}

module.exports = new MessageService()