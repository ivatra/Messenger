import { IMessage, IChat } from "../../../shared"

export interface IInbox {
    id: string
    countUnreadMsgs: number
    isPinned: boolean
    message: IMessage
    chat: IChat
}