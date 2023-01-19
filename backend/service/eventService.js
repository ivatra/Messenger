const eventsQueries = require('../database/mongo/queries/eventsQueries');
const chatQueries = require('../database/postqre/queries/chatQueries');
const messageQueries = require('../database/postqre/queries/messageQueries');
const chatService = require('./chatService');

class eventService {
    async get(userId) {
        return await eventsQueries.receiveEvents(userId)
    }

    async setTyping(userId, chatId) {
        const participants = await chatService.getChatParticipants(chatId)

        chatQueries.updateParticipantTypingStatus(userId, true)

        for (var participant of participants) {
            eventsQueries.createChatEvent(participant.dataValues.userId, chatId, 'Typing', userId, false)
        }

    }

    async setMessageRead(userId, messageId, chatId) {
        await this.updateMessageRead(userId, messageId)
        const isMessageNoted = await this.messageArleadyNotedRead(messageId)
        const participants = await chatQueries.receiveParticipantsByChat(chatId)
        if (!isMessageNoted) {
            for (var participant of participants) {
                eventsQueries.createMessageEvent(participant.user.id, chatId, 'any', true, 'Message Read',false)
                await this.updateMessageRead(participant.user.id, messageId)
            }
        }

    }

    async updateMessageRead(userId, messageId) {
        eventsQueries.updateMessageReadStatus(userId, messageId)
        messageQueries.updateMessage(messageId, { isRead: true })
    }

    async messageArleadyNotedRead(messageId) {
        const message = await messageQueries.receiveMessage(messageId)
        return message.dataValues.isRead
    }
}


module.exports = new eventService()