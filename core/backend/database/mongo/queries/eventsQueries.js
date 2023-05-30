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
    //Message
    async createReceivedMessageEvent(recipientId, message, chatId, isMentioned) {
        const event = {
            type: 'received_message',
            recipientId: recipientId,
            data: {
                message: message,
                chatId: Number(chatId),
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
                chatId: Number(chatId),
                msgId: Number(chatId)
            },
            notify: false
        };

        insertEvent(event);
    }

    //Contact
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

    //Chat Participant

    async createParticipantInvitedEvent(recipientId, chatId, participant, inviterId) { //done
        const event = {
            type: 'participant_invited',
            recipientId: recipientId,
            data: {
                chatId: Number(chatId),
                participant: participant,
                inviterId: inviterId
            },
            notify: false
        };
        console.log(event)
        insertEvent(event);
    }

    async createParticipantRemovedEvent(recipientId, chatId, participantId, removerId) { //done
        const event = {
            type: 'participant_removed',
            recipientId: recipientId,
            data: {
                chatId: Number(chatId),
                participantId: Number(participantId),
                removerId: removerId
            },
            notify: false
        };
        console.log(event)
        insertEvent(event);
    }


    //Chat
    async createTypingEvent(recipientId, chatId, typingState, participantTyperId) { //changed
        const event = {
            type: 'typing',
            recipientId: recipientId,
            data: {
                chatId: Number(chatId),
                typingState: typingState,
                typerId: Number(participantTyperId)
            },
            notify: false
        };

        insertEvent(event);
    }
    async createExcludedFromChatEvent(recipientId, inboxId, excluderId) { //changed
        const event = {
            type: 'excluded_from_chat',
            recipientId: recipientId,
            data: {
                inboxId: Number(inboxId),
                excluderId: excluderId
            },
            notify: true
        };
        insertEvent(event);
    }
    async createInvitedToChatEvent(recipientId, inbox, inviterId) { //changed
        const event = {
            type: 'invited_to_chat',
            recipientId: recipientId,
            data: {
                invitedId: inviterId,
                inbox: inbox
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
                chatId: Number(chatId)
            },
            notify: false
        };
        console.log(event)
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