
export interface IMessageContentItem {
    type: "Message";
    data: IMessage;
}

export interface IDictMessage{
    [msgId:number | string]:IMessage
}

export interface IMessage {
    id: number
    chatId:number
    isMentioned:boolean
    status?: MessageState
    content: string
    attachementId?: number
    senderId: string
    isRead: boolean
    index: number
    createdAt: string
    updatedAt: string
}

export type MessageState = 'loading' | 'error' | 'sent'

