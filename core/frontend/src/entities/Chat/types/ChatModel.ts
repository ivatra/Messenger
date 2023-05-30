export interface IDictChatParticipant {
    [participantId: number]: IChatParticipant
}

export interface IChatParticipant {
    id:number
    userId: string
    role: 'ADMIN' | 'USER'
}

export interface IDictChat {
    [chatId: number]: IChat
}


export interface IGroupChatProps{
    type:'group'
    participantsCount:number
    role:'USER' | 'ADMIN'
}

export interface IIndividualChatProps{
    type:"individual"
}

type ChatTypes = IIndividualChatProps | IGroupChatProps

export type IChat = ChatTypes & {
    id:number
    countUnreadMsgs: number
    name: string
    avatar: string
    participants: IDictChatParticipant
    typingUsers: number[] | undefined
    items: [
        { ["messages"]: number[] },
        { ["events"]: number[] }
    ] | undefined,
    attachements: number[] | undefined
}
