import { IMessage } from "../../../shared";
import { IMatchedInboxesResponse } from "./ApiResponse";
import { IInbox } from "./Model";

interface IReceiveParams {
    page: number
    limit: number
}


export interface IInboxStore {
    inboxes: IInbox[]
    pinnedInboxes: IInbox[]
    matchedInboxes: IMatchedInboxesResponse

    inboxesTotalCount: number
    isMatched: boolean

    pin: (id: number) => void

    receive: (limit: number) => void
    receivePinned: () => void
    receiveMatched: (message: string) => void

    updateMessage: (message: IMessage, inboxId: number) => void // events feature ought to update this 
}