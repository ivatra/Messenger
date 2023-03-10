import { IMessage,IChat } from "@/src/shared"

export interface IInbox{
    id:string
    countUnreadMsgs:number
    isPinned:boolean
    message:IMessage
    chat:IChat
}