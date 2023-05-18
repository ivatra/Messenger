import { SharedTypes } from "../../../shared";

export interface IInbox {
    id: number
    countUnreadMsgs: number
    isPinned: boolean
    message: SharedTypes.IMessage
    chat: SharedTypes.IChat
}