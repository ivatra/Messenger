
class EventCreator {
    createMessageEvent(recipientId, message, isMentioned = false,isRead = false) {
        return {
            recipientId: recipientId,
            type: "Message",
            content: {
                status: "Received Message",
                message: message,
                isRead: isRead,
                isMentioned: isMentioned
            },
            notify: true,
            sent: false
        };
    }

    createContactEvent(recipientId, status, contact) {
        return {
            recipientId: recipientId,
            type: "Contact",
            content: {
                status: status,
                contact: contact
            },
            notify: true,
            sent: false
        }
    }

    createChatEvent(recipientId, chat, status, userId = null) {
        return {
            recipientId: recipientId,
            type: "Chat",
            content: {
                status: status,
                userId: userId,
                chat: chat
            },
            notify: true,
            sent: false
        }

    }
}


module.exports = new EventCreator()