
export interface IMessageContentItem {
    type: "Message";
    data: IMessage;
}

interface IMessageActionContentItem {
    type: "Action";
    data: IChatEvent;
}

export interface IParticipantAction {
    type: "Removed" | "Added";
    causeId: string;
    victimId: string;
}

export type IChatEvent = {
    id: number;
} & (IParticipantAction);


export interface IDictMessage{
    [msgId:number]:IMessage
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

export type IContentItem = IMessageContentItem | IMessageActionContentItem
export type MessageState = 'loading' | 'error' | 'sent'

