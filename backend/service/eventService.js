const eventCreator = require('../events/eventCreator');
const { ChatParticipant, Message } = require('../models');
const mongoClient = require('../mongo');
const chatService = require('./chatService');
const events = mongoClient.db('Messenger').collection('events');

class eventService {
    async get(userId) {
        return await events.find({ recipientId: "cca23be1-897c-42a3-bfc3-178d96a73cba" }).toArray()
    }

    async setTyping(userId, chatId) {
        const participants = await chatService.getChatParticipants(chatId)

        await this.updateChatParticipant(userId)

        for (var participant of participants) {
            var event = eventCreator.createChatEvent(participant, chatId, 'Typing', userId)
            await events.insertOne(event)
        }

    }

    async setMessageRead(userId, messageId, chatId) {
        await this.updateMessage(messageId)
        await this.updateMessageRead(userId, messageId)

        const isMessageNoted = this.messageArleadyNotedRead(messageId)

        if (!isMessageNoted) {
            var event = eventCreator.createMessageEvent(userId, chatId, 'Message Read', userId)
            await events.insertOne(event)
        }

    }

    async updateMessageRead(userId, messageId) {
        events.updateOne({
            recipientId: userId, "content.message.id": messageId
        },
            {
                $set: {
                    "content.isRead": true
                }
            })
    }

    async messageArleadyNotedRead(messageId) {
        return await Message.findByPk(messageId, {
            where: {
                isRead: true
            },
        }) ? true : false

    }
    async updateChatParticipant(userId) {
        ChatParticipant.update({ isTyping: true }, {
            where: {
                userId: userId
            }
        })
    }

    async updateMessage(messageId) {
        Message.update({ isRead: true }, {
            where: {
                id: messageId
            }
        })
    }
}

module.exports = new eventService()