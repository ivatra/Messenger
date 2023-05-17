import { FileWithPath } from "@mantine/dropzone"
import { SharedTypes } from "../../../shared"
import { IContentItem, IListMessage } from "./Model"




export interface IChatContent {
    items: IContentItem[];
    page: number;
    totalCount:number | undefined
    communicationMessagesTally :number
    hasMore: boolean;
}

export interface IAttachementsContent {
    attachments: IListMessage[]
    page: number
    totalCount: number | undefined
    hasMore: boolean
}

export interface IStoreMessage {
    [chatId: number]: IChatContent
}

export interface IStoreAttachement{
    [chatId: number]: IAttachementsContent
}


export interface IMessageStore {
    items: IStoreMessage
    attachments: IStoreAttachement

    receiveMessages: (chatId: number,offset:number,limit: number) => void
    receiveAttachments: (chatId: number, limit: number) => void

    sendMessage: (chatId: number, message: string, attachement?: FileWithPath) => void
    sendAttachment: (chatId: number, attachement: any) => void

    setMessageRead:(chatId:number,messageId:number) => void
    setPage:(chatId:number,page:number) => void
    
    increaseCommunicationMessagesTally:(chatId:number) => void
    addItemExternal: (chatId: number,content:IContentItem) => void;
}