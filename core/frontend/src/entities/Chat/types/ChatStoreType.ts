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
    receiveChatIdByUserId: (userId: string) => Promise<number | undefined> //done
    receiveByChatId: (chatId: number) => void //done
    createGroupChat: (participantsIds: number[], fields: IGroupChatUpdatebleFields) => void //done

    addParticipant: (chatId: number, userId: number) => void //done
    kickParticipant: (chatId: number, participantId: number) => void //done

    setGroupChatCreationOpened: (value: boolean) => void

    // Might be WS.
    editGroupChat: (chatId: number, fields: IGroupChatUpdatebleFields,doHttp:boolean) => void 

    // WS actions.
    addParticipantWS: (chatId: number, participant: IChatParticipant) => void //done
    kickParticipantWS: (chatId: number, participantId: number) => void //done

    removeChat: (chatId: number) => void
    addTypingUser: (chatId: number, participantId: number) => void
    removeTypingUser: (chatId: number, participantId: number) => void

}
