import { SharedTypes } from "../../../shared";

export interface IInbox {
    id: number
    countUnreadMsgs: number
    isPinned: boolean
    name: string
    avatar: string
    
    chatId: number
    chatType: 'individual' | 'group'

    message: SharedTypes.IMessage 
  
}