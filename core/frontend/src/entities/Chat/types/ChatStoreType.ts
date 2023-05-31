import { IDictChat } from "./ChatModel";
import { IChatParticipant } from "./ChatParticipantModel";

import { SharedTypes } from "../../../shared";

export interface IGroupChatUpdatebleFields {
    avatar?: File
    name?: string
}

export interface IChatStoreVariables extends SharedTypes.IStoreFeedback {
    chats: IDictChat
    groupChatCreationOpened: boolean
}

export type ChatStoreType = IChatStoreActions & IChatStoreVariables

export interface IChatStoreActions {
    // Local actions.
    receiveChatIdByUserId: (userId: string) => Promise<number | undefined>
    receiveByChatId: (chatId: number) => void
    createGroupChat: (participantsIds: number[], fields: IGroupChatUpdatebleFields) => void

    addParticipant: (chatId: number, userId: number) => void
    kickParticipant: (chatId: number, participantId: number) => void


    decrementCUnreadMsgs: (chatId:number) => void
    setGroupChatCreationOpened: (value: boolean) => void

    // Might be WS.
    editGroupChat: (chatId: number, fields: IGroupChatUpdatebleFields) => void

    removeChat: (chatId: number) => void // Message depenence

    // WS actions.

    incrementCUnreadMsgs: (chatId:number) => void


    editGroupChatWS:(chatId:number,name:string,avatar:string) => void
    addParticipantWS: (chatId: number, participant: IChatParticipant) => void
    kickParticipantWS: (chatId: number, participantId: number) => void

    addTypingUser: (chatId: number, participantId: number) => void
    removeTypingUser: (chatId: number, participantId: number) => void

}
