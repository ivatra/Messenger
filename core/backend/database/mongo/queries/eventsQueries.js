const mongoClient = require('../mongo');
const events = mongoClient.db('Messenger').collection('events');

const { userSockets } = require('../../../websocket/userSocket')

function insertEvent(event) {
    event.createdAt = new Date();
    const ws = userSockets.get(event.recipientId);
    if (ws && ws.isAlive) {
        ws.send(JSON.stringify([event]), (err) => {
            if (err) {
                console.log('Failed to send event:', err);
            } else {
                console.log('sent ', event.type);
            }
        });
    }
}
class eventQueries {
    async createReceivedMessageEvent(recipientId, message, chatId, isMentioned) {
        const event = {
            type: 'received_message',
            recipientId: recipientId,
            data: {
                message: message,
                chatId: chatId,
                isMentioned: isMentioned
            },
            notify: false
        };

        insertEvent(event);
    }

    async createReadMessageEvent(recipientId, chatId, msgId) {
        const event = {
            type: 'message_read',
            recipientId: recipientId,
            data: {
                chatId: chatId,
                msgId: msgId
            },
            notify: false
        };

        insertEvent(event);
    }

    async createContactEvent(recipientId, contact, status) {
        const event = {
            type: 'contact',
            recipientId: recipientId,
            data: {
                contact: contact,
                status: status
            },
            notify: true
        };

        insertEvent(event);
    }

    async createTypingEvent(recipientId, chatId, typingState, typerId) {
        const event = {
            type: 'typing',
            recipientId: recipientId,
            data: {
                chatId: chatId,
                typingState: typingState,
                typerId: typerId
            },
            notify: false
        };

        insertEvent(event);
    }

    async createParticipantInvitedEvent(recipientId, chatId, participant, inviterId) {
        const event = {
            type: 'participant_invited',
            recipientId: recipientId,
            data: {
                chatId: chatId,
                participant: participant,
                inviterId: inviterId
            },
            notify: false
        };

        insertEvent(event);
    }

    async createParticipantRemovedEvent(recipientId, chatId, participantId, removerId) {
        const event = {
            type: 'participant_removed',
            recipientId: recipientId,
            data: {
                chatId: chatId,
                participantId: participantId,
                removerId: removerId
            },
            notify: false
        };

        insertEvent(event);
    }

    async createExcludedFromChatEvent(recipientId, chatId, excluderId) {
        const event = {
            type: 'excluded_from_chat',
            recipientId: recipientId,
            data: {
                chatId: chatId,
                excluderId: excluderId
            },
            notify: true
        };

        insertEvent(event);
    }

    async createInvitedToChatEvent(recipientId, chat, inviterId) {
        const event = {
            type: 'invited_to_chat',
            recipientId: recipientId,
            data: {
                invitedId: inviterId,
                chat: chat
            },
            notify: true
        };

        insertEvent(event);
    }

    async createChatUpdatedEvent(recipientId, name,avatar, chatId) {
        const event = {
            type: 'chat_updated',
            recipientId: recipientId,
            data: {
                name:name,
                avatar:avatar,
                chatId: chatId
            },
            notify: false
        };

        insertEvent(event);
    }

    async receiveEvents(userId) {
        return await events.find({ recipientId: userId, sent: false }).toArray()
    }

    async receiveUnreadMsgs(userId) {
        return await events.find({
            type: "Message",
            recipientId: userId,
            "content.isRead": false
        }).toArray()
    }


    async updateEventsSentStatus(eventId) {
        return await events.updateMany({
            _id: eventId
        },
            {
                $set: {
                    "sent": true
                }
            })
    }
    async destroyNotRelevant() {
        return await events.deleteMany({ notify: false })
    }

}

module.exports = new eventQueries()