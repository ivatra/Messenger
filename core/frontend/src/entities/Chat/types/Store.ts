import { IContact } from "../../Contact";

import { SharedTypes } from "../../../shared";


export interface IStoreChat {
    [chatId: number]: SharedTypes.IChat
}

export interface ITypingUsers {
    [userId: string]: SharedTypes.IUser[]
}

export interface IGroupChatUpdatebleFields {
    avatar?: string
    name?: string
}

export interface IChatStore {
    chats: IStoreChat
    currentChatId: number

    setCurrentChatId: (chatId: number | undefined) => void

    receiveChatWithUser: (userId: string) => Promise<number | undefined>
    receiveChat: (chatId: number) => void

    addParticipant: (chatId: number, participant: SharedTypes.IChatParticipant) => void
    removeParticipant: (chatId: number, userId: string) => void
    editGroupChat: (chatId: number, fields: IGroupChatUpdatebleFields) => void

    createGroupChat: (participants: IContact[], fields: IGroupChatUpdatebleFields) => void

    addChat: (chat: SharedTypes.IChat) => void
    removeChat: (chatId: number) => void

    addParticipantWS: (chatId: number, participant: SharedTypes.IChatParticipant) => void
    removeParticipantWS: (chatId: number, participantId: number) => void
    editGroupChatWS: (chatId: number, fields: IGroupChatUpdatebleFields) => void

    addTypingUser: (chatId: number, userId: string) => void
    removeTypingUser: (chatId: number, userId: string) => void

}