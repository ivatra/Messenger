function getMessageReceivedEvent(recipientId, messageId, isMentioned = false) {
    const event = {
        recipientId: recipientId,
        type: "Message",
        content: {
            status: "Received Message",
            messageId,
            isRead: false,
            isMentioned: isMentioned
        },
        notify: true,
        sent: false
    };
    return event;
}

module.exports = getMessageReceivedEvent;