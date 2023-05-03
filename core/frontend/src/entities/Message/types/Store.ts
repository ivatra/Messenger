import { IMessage } from "../../../shared"
import { IContentItem } from "./Model"


export interface IStoreMessage {
    [chatId: number]: IContentItem[]
}

interface IStoreAttachement{
    [chatId:number]:IMessage[]
}


export interface IMessageStore {
    messages: IStoreMessage
    attachements: IStoreAttachement
    
    messagesAmount:number
    page:number

    receiveMessages: (chatId: number,limit: number) => void
    receiveAttachements: (chatId: number, limit: number) => void

    addMessage: (chatId: number, message: string, attachement?: any) => void
    addAttachement: (chatId: number, attachement: any) => void

    setMessageRead:(chatId:number,messageId:number) => void
    setPage:(page:number) => void

    addContentExternal: (chatId: number,content:IContentItem) => void;
}