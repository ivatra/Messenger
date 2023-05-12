import { IEventRequest } from "../../../shared"


export function sendMessageReadEvent(socket: WebSocket, chatId: number, msgId: number) {
    const event: IEventRequest = {
        type: 'message_read',
        data: {
            chatId: chatId,
            messageId:msgId
        }

    }
    socket.send(JSON.stringify(event))
}