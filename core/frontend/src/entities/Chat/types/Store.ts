
import { IContact } from "../../Contact";
import { IUser, IChat, IChatParticipant } from "../../../shared";



export interface IStoreChat{
   [chatId:number]:IChat
}

export interface ITypingUsers { 
    [userId: string]: IUser[]
 } 

export interface IGroupChatUpdatebleFields{
    avatar?:string
    name?:string
}

export interface IChatStore{
    chats :IStoreChat
    currentChatId:number

    setCurrentChatId:(chatId:number) => void

    receiveChatWithUser: (userId: string) => Promise<number | undefined>
    receiveChat: (chatId: number) => void

    addParticipant: (chatId:number,participant:IChatParticipant) => void
    removeParticipant: (chatId:number,userId:string) => void
    editGroupChat: (chatId:number,fields: IGroupChatUpdatebleFields) => void

    createGroupChat: (participants: IContact[], fields:IGroupChatUpdatebleFields) => void

    addChat:(chat:IChat) => void
    removeChat:(chatId:number) => void

    addParticipantExternal:(chatId:number,participant:IChatParticipant) => void
    removeParticipantExternal: (chatId:number,participantId: number) => void
    editGroupChatExternal: (chatId:number,fields: IGroupChatUpdatebleFields) => void

    addTypingUser:(chatId:number,userId:string) => void
    removeTypingUser:(chatId:number,userId:string) => void
    
}