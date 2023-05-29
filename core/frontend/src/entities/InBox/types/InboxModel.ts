export interface IInbox {
    [inboxId: number]: {
        id: number
        isPinned: boolean
        chatId: number
        messageId: number
    }

}