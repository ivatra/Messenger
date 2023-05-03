const eventsQueries = require('../database/mongo/queries/eventsQueries');
const chatQueries = require('../database/postqre/queries/chatQueries');
const messageQueries = require('../database/postqre/queries/messageQueries');
const ApiError = require('../error/ApiError');
const chatService = require('./chat/chatService');


async function validateOnReadMessage(chatId, messageId) {
    const message = await messageQueries.receiveMessage(messageId)

    if (!message) {
        throw ApiError.badRequest('Message doesnt exist')
    }

    if (message.chatId !== chatId) {
        throw ApiError.forbidden('No access to make this message read')
    }

}
class eventService {
    async get(userId) {
        return await eventsQueries.receiveEvents(userId)
    }

    async setEventsSent(events) {
        for (var event of events) {
            await eventsQueries.updateEventsSentStatus(event._id)
        }
        return ''
    }

    async setTyping(userId, chatId, isTyping) {
        if (!chatId || !userId) {
            throw ApiError.badRequest('There is no userId or chatId passed in')
        }
        await chatService.checkForMemberingInChat(userId, chatId)

        const participants = await chatQueries.receiveParticipantsByChat(chatId)

        await chatQueries.updateParticipantTypingStatus(userId, true)

        // const chat = await chatQueries.receiveChatByPk(chatId)
        for (var participant of participants) {
            // if(participant.user.id === userId) continue
            await eventsQueries.createTypingEvent(participant.user.id, chatId, isTyping,userId)
        }
    }

    async setMessageRead(userId, messageId, chatId) {
        await validateOnReadMessage(chatId, messageId)
        await chatService.checkForMemberingInChat(userId, chatId)

        await this.updateMessageRead(userId, messageId)
        const isMessageNoted = await this.messageArleadyNotedRead(messageId)
        const participants = await chatQueries.receiveParticipantsByChat(chatId)
        if (!isMessageNoted) {
            for (var participant of participants) {
                eventsQueries.createReadMessageEvent(participant.user.id, chatId, messageId)
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