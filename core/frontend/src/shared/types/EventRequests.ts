
export type IEventRequest = ITypingRequest | IMessageReadRequest


type ITypingRequest = {
    type: 'typing'
    data: {
        chatId: number
        isTyping: boolean
    }
}

type IMessageReadRequest = {
    type: 'message_read'
    data: {
        chatId: number
        messageId: number
    }
}