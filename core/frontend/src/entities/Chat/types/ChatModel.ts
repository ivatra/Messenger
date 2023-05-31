import { IDictChatParticipant } from "./ChatParticipantModel"
import { ChatProps } from "./ChatPropsModel"


export interface IDictChat {
    [chatId: number]: IChat
}
   
export type IChat = ChatProps & {
    id: number
    countUnreadMsgs: number
    name: string
    avatar: string
    participants: IDictChatParticipant
    typingUsers: number[] | undefined
}
