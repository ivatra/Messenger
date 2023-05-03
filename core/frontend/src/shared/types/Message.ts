
export interface IAttachement {
    id: string
    type: 'string' | 'image'
    url: string
}

export  interface IMessage {
    id: number
    index:number
    content: string
    senderId:string
    isRead: boolean
    createdAt:string
    updatedAt:string
    attachement?:IAttachement
    isMentioned:boolean
}