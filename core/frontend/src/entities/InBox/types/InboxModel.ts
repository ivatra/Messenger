export interface IDictInbox {
    [inboxId: number]: IInbox
}

export interface IInbox{
    id: number
    isPinned: boolean
    chatId: number
    messageId: number
}