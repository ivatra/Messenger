export interface IDictInbox {
    [inboxId: number]: IInbox
}

export interface IInbox{
    id: number
    name: number
    avatarUrl: string
    isPinned: boolean
    chatId: number
    messageId: number
}