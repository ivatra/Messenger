import { IChat, IMessage } from "../../../shared"

export interface IInbox {
    id: number
    countUnreadMsgs: number
    isPinned: boolean
    message: IMessage
    chat: IChat
}