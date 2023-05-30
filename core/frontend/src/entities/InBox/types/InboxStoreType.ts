import { SharedTypes } from "../../../shared";
import { IDictInbox,IInbox } from "./InboxModel";

export type InboxStoreType = IInboxActions & IInboxVariables

export interface IInboxActions {
    pin: (inboxId: number) => void

    receivePinned: () => void
    receiveByOffset: (limit: number, offset: number) => void
    receiveByChatId: (chatId: number) => void
    receiveBySearchTerm: (searchTerm: string) => void


    // WS.
    addInbox: (inbox: IInbox) => void
    removeInbox: (inboxId: number) => void // Chat dependence
    updateMsgId: (inboxId: number, msgId: number) => void
}

export interface IInboxVariables extends SharedTypes.IStoreFeedback {
    inboxes: IDictInbox
    matchedInboxes: IDictInbox
    inboxesTotalCount: number
}
