import { IMessage } from "../../../shared";
import { IMatchedInboxesResponse } from "./ApiResponse";
import { IInbox } from "./Model";


export interface IInboxStore {
    inboxes: IInbox[]
    pinnedInboxes: IInbox[]
    matchedInboxes: IMatchedInboxesResponse

    inboxesTotalCount: number
    isMatched: boolean

    pin: (id: number) => void

    receive: (limit: number) => void
    receiveByChat:(chatId:number) => void
    receivePinned: () => void
    receiveMatched: (message: string) => void

    updateMessage: (message: IMessage, chatId: number,isExternal:boolean) => void // events feature ought to update this 
}