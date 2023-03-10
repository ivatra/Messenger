import { IMessage } from "@/src/shared"

interface IAttachement {
    id: string
    type: 'string' | 'image'
    url: string
}


export interface IMessageWithAttachement extends IMessage{
    attachement: IAttachement
}