import { IContact, IGroupChatUpdatebleFields } from "../../../entities"
import { IContactStatus } from "../../../entities/Contact/types/Model"
import { IChat, IChatParticipant, IMessage } from "../../../shared"

export interface IReceivedMessageEvent {
    type: 'received_message'
    data: {
        message: IMessage
        chatId:number
        isMentioned: boolean
    }
}

export interface IReadMessageEvent {
    type: 'message_read'
    data: {
        chatId:number
        msgId: number
    }
}

export interface IContactEvent {
    type: "contact"
    data: {
        contact: IContact
        status: IContactStatus
    }
}

interface ITypingEvent {
    type: 'typing'
    data: {
        chatId: number
        typingState: boolean
        typerId: string
    }
}

export interface IParticipantInvitedEvent {
    type: 'participant_invited'
    data: {
        chatId: number
        participant: IChatParticipant
        inviterId:string
    }
}

export interface IParticipantRemovedEvent {
    type: 'participant_removed'
    data: {
        chatId: number
        participantId: number
        removerId:string
    }
}

export interface IExcludedFromChat {
    type: 'excluded_from_chat'
    data: {
        exluderId:string
        chatId: number
    }
}
export interface IInvitedToChat {
    type: 'invited_to_chat'
    data: {
        invitedId:string
        chat: IChat
    }
}

interface IChatUpdatedEvent {
    type: 'chat_updated'
    data: {
        fields: IGroupChatUpdatebleFields
        chatId: number
    }
}


export type IEvents = IInvitedToChat
    | IReceivedMessageEvent
    | IReadMessageEvent
    | IContactEvent
    | ITypingEvent
    | IParticipantInvitedEvent
    | IParticipantRemovedEvent
    | IExcludedFromChat
    | IInvitedToChat
    | IChatUpdatedEvent


