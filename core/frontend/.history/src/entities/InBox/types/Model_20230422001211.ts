import { IMessage, IChat } from "../../../shared"

export interface IInbox {
    id: number
    countOfUnreadMsgs: number
    isPinned: boolean
    message: IMessage
    chat: IChat
}