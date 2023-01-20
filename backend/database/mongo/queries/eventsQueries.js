const mongoClient = require('../mongo');
const events = mongoClient.db('Messenger').collection('events');


class eventQueries {
    async createMessageEvent(recipientId, message, isMentioned = false, isRead = false, status = 'Received Message',notify = true) {
        const event = {
            recipientId: recipientId,
            type: "Message",
            content: {
                status: status,
                message: message,
                isRead: isRead,
                isMentioned: isMentioned
            },
            notify: notify,
            sent: false
        };
        await events.insertOne(event)
    }

    async createContactEvent(recipientId, status, contact) {
        const event = {
            recipientId: recipientId,
            type: "Contact",
            content: {
                status: status,
                contact: contact
            },
            notify: true,
            sent: false
        }

        await events.insertOne(event)
    }

    async createChatEvent(recipientId, chat, status, userId = null, notify = true) {
        const event = {
            recipientId: recipientId,
            type: "Chat",
            content: {
                status: status,
                userId: userId,
                chat: chat
            },
            notify: notify,
            sent: false
        }

        await events.insertOne(event)

    }

    async receiveEvents(userId){
        return await events.find({ recipientId: '7b36b12e-ede3-494c-9581-54ddc232c4ef',sent:false }).toArray()
        // return await events.find({ recipientId: userId }).toArray()
    }

    async receiveUnreadMsgs(userId){
        return await events.find({
            type: "Message",
            recipientId: userId,
            "content.isRead": false
          }).toArray()
    }

    async updateMessageReadStatus(userId,messageId){
        return await events.updateOne({
            recipientId: userId, "content.message.id": messageId
        },
            {
                $set: {
                    "content.isRead": true
                }
            })
    }

    async updateEventsSentStatus(eventId){
        return await events.updateMany({
            id:eventId
        },
            {
                $set: {
                    "sent": true
                }
            })
    }

}

module.exports = new eventQueries()