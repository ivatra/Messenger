import {IUser} from "./User"

export interface IChatParticipant {
    id: number
    user: IUser
    role: 'ADMIN' | 'USER'
    isTyping: boolean
}

interface IIndividualChat {
    isActive: boolean
}

interface IGroupChat {
    name: string
    avatar: string
    participiantsCount: number
}


export interface IChat {
    id: number
    type: 'individual' | 'group'
    groupChat: IGroupChat
    individualChat: IIndividualChat
    participants: IChatParticipant[]
    typingUsers:IChatParticipant[]
}