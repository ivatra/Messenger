import type {
    IMessage,
    IContact,
    IInbox,
    IContactStatus,
    IChatParticipant
} from "../../../entities";

export interface IReceivedMessageEvent {
    type: 'received_message'
    data: {
        message: IMessage
        chatId: number
    }
}

export interface IReadMessageEvent {
    type: 'message_read'
    data: {
        chatId: number
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

interface ITypingEvent { //changed
    type: 'typing'
    data: {
        chatId: number
        typingState: boolean
        participantTyperId: number
    }
}

export interface IParticipantInvitedEvent {
    type: 'participant_invited'
    data: {
        chatId: number
        participant: IChatParticipant
        inviterId: string
    }
}

export interface IParticipantRemovedEvent {
    type: 'participant_removed'
    data: {
        chatId: number
        participantId: number
        removerId: string
    }
}

export interface IExcludedFromChat { //changed
    type: 'excluded_from_chat'
    data: {
        exluderId: string
        inboxId: number
    }
}
export interface IInvitedToChat {  //changed
    type: 'invited_to_chat'
    data: {
        invitedId: string
        inbox: IInbox
    }
}

interface IGroupChatUpdatedEvent {
    type: 'chat_updated'
    data: {
        name: string
        avatar: string
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


