interface IMessageEventContent {
    status: string
    message: IMessage
    isRead: boolean
    isMentioned: boolean
}

interface IContactEventContent {
    status: 'accepted' | 'declined' | 'pending'
    contact: IContact
}

interface IChatEventContent {
    chat: IChat
    status: 'Invited' | 'Kicked'
}
