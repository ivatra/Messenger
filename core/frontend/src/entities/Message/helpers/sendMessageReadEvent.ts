import { SharedTypes } from "../../../shared"


export function sendMessageReadEvent(socket: SharedTypes.ISocketActions, chatId: number, msgId: number) {
    const event: SharedTypes.IEventRequest = {
        type: 'message_read',
         data: {
            chatId: chatId,
            messageId:msgId
        }

    }
    socket.send(event)
}