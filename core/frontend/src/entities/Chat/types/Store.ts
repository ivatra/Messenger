
import { IUser } from "../../../shared";
import { IContact } from "../../Contact";
import { IChat } from "../../../shared/types/Chat";



export interface IStoreChat{
    id:number
    chat:IChat
}

interface IGroupChatUpdatebleFields{
    avatar?:string
    name?:string
}

export interface IChatStore{
    chats :IStoreChat[]
    currentChatId:number

    setCurrentChatId:(chatId:number) => void

    getChatWithUser:(userId:string) => Promise<number | undefined>
    getChat: (chatId: number) => void

    addParticipant:(userId:string) => void
    removeParticipant:(userId:string) => void
    editGroupChat: (fields: IGroupChatUpdatebleFields) => void

    createGroupChat: (participants: IContact[], name: string, avatar: any) => void

    addParticipantExternal:(participant:IUser) => void
    removeParticipantExternal: (userId: string) => void
    editGroupChatExternal: (chatId:number,fields: IGroupChatUpdatebleFields) => void
    
}