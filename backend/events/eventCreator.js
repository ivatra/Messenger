
class EventCreator {
    createMessageReceivedEvent(recipientId, message, isMentioned = false) {
        return {
            recipientId: recipientId,
            type: "Message",
            content: {
                status: "Received Message",
                message,
                isRead: false,
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
}


module.exports = new EventCreator()