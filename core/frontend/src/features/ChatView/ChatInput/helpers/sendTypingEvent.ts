
import { IEventRequest } from "../../../../shared"


export function sendTypingEvent(socket: WebSocket,isTyping:boolean,chatId:number){
    const event: IEventRequest = {
        type: 'typing',
        data: {
            chatId: chatId,
            isTyping: isTyping
        }

    }

    socket.send(JSON.stringify(event))
}