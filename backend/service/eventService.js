const eventsQueries = require('../database/mongo/queries/eventsQueries');
const chatQueries = require('../database/postqre/queries/chatQueries');
const messageQueries = require('../database/postqre/queries/messageQueries');
const chatService = require('./chatService');

class eventService {
    async get(userId) {
        return await eventsQueries.receiveEvents(userId)
    }

    async setEventsSent(events) {
        for (var event of events) {
            await eventsQueries.updateEventsSentStatus(event.id)
        }
    }

    async setTyping(userId, chatId) {
        const participants = await chatService.getChatParticipants(chatId)

        await chatQueries.updateParticipantTypingStatus(userId, true)

        for (var participant of participants) {
            await eventsQueries.createChatEvent(participant.userId, chatId, 'Typing', userId, false)
        }

    }

    async setMessageRead(userId, messageId, chatId) {
        await this.updateMessageRead(userId, messageId)
        const isMessageNoted = await this.messageArleadyNotedRead(messageId)
        const participants = await chatQueries.receiveParticipantsByChat(chatId)
        if (!isMessageNoted) {
            for (var participant of participants) {
                eventsQueries.createMessageEvent(participant.user.id, chatId, 'any', true, 'Message Read', false)
                await this.updateMessageRead(participant.user.id, messageId)
            }
        }

    }

    async updateMessageRead(userId, messageId) {
        await eventsQueries.updateMessageReadStatus(userId, messageId)
        await messageQueries.updateMessage(messageId, { isRead: true })
    }

    async messageArleadyNotedRead(messageId) {
        const message = await messageQueries.receiveMessage(messageId)
        return message.isRead
    }
}


module.exports = new eventService()