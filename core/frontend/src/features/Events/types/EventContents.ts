import { IContact, IGroupChatUpdatebleFields } from "../../../entities"
import { IContactStatus } from "../../../entities/Contact/types/Model"
import { IListMessage } from "../../../entities/Message/types/Model"
import { SharedTypes } from "../../../shared";

export interface IReceivedMessageEvent {
    type: 'received_message'
    data: {
        message: IListMessage
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
        participant: SharedTypes.IChatParticipant
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
        chat: SharedTypes.IChat
    }
}

interface IGroupChatUpdatedEvent {
    type: 'chat_updated'
    data: {
        name:string
        avatar:string
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
    | IGroupChatUpdatedEvent


