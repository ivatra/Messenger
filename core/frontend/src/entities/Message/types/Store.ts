import { IMessage } from "../../../shared"


interface IStoreMessage {
    chatId: number
    message: IMessage
}

interface IAttachementStore {
    chatId: number
    attachement: any
}

export interface IMessageStore {
    messages: IStoreMessage[]
    attachements: IAttachementStore[]

    getMessages: (chatId: number, offset: number, limit: number) => void
    getAttachements: (chatId: number, limit: number) => void

    addMessage: (chatId: number, message: string, attachement?: any) => void
    addAttachement: (chatId: number, attachement: any) => void

    addContentExternal: (message: IMessage) => void
}