interface IChatParticipant {
    id: string
    role: 'ADMIN' | 'USER'
    isTyping: boolean
}

interface IIndividualChat {
    isActive: boolean
}

interface IGroupChat {
    name: string | null
    avatar: string | null
    countOfParticipants: number
}


export interface IChat {
    id: string
    type: 'individual' | 'group'
    groupChat: IGroupChat
    individualChat: IIndividualChat
    participants: IChatParticipant[]
}