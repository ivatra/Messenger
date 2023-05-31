
export interface IDictAttachement {
    [attachId: number]: IAttachement
}

export interface IAttachement {
    id: number
    chatId: number
    messageId: number
    type: 'string' | 'image'
    url: string
}
