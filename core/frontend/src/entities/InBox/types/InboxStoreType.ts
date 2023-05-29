import { SharedTypes } from "../../../shared";
import { IInbox } from "./InboxModel";


export interface IInboxActions{
    pin: (inboxId: number) => void

    receivePinned: () => void
    receiveByOffset: (limit: number, offset: number) => void
    receiveByChatId: (chatId: number) => void
    receiveBySearchTerm: (searchTerm: string) => void

    updateMsgId: (inboxId: number, msgId: number) => void
}

export interface IInboxVariables extends SharedTypes.IStoreFeedback{
    inboxes: IInbox
    matchedInboxes: IInbox
    inboxesTotalCount:number
}
