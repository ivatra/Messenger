import IUser from "./User"

interface IChatParticipant {
    id: string
    user:IUser
    role: 'ADMIN' | 'USER'
    isTyping: boolean
}

interface IIndividualChat {
    isActive: boolean
}

interface IGroupChat {
    name: string
    avatar: string
    countOfParticipants: number
}


export default interface IChat {
    id: string
    type: 'individual' | 'group'
    groupChat: IGroupChat
    individualChat: IIndividualChat
    participants: IChatParticipant[]
}