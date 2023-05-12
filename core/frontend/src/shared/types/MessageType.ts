
export interface IAttachement {
    id: number
    type: 'string' | 'image'
    url: string
}

export interface IMessage {
    id: number
    content: string
    senderId:string
    isRead: boolean
    createdAt:string
    updatedAt:string
}