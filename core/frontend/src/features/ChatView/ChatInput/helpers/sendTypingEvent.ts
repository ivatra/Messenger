import { SharedTypes } from "../../../../shared"


export function sendTypingEvent(socket: SharedTypes.ISocketActions, isTyping: boolean, chatId: number) {
    const event: SharedTypes.IEventRequest = {
        type: 'typing',
        data: {
            chatId: chatId,
            isTyping: isTyping
        }

    }

    socket.send(event)
}