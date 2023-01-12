function getMessageReceivedEvent(recipientId, message, isMentioned = false) {
    const event = {
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
    return event;
}

module.exports = getMessageReceivedEvent;