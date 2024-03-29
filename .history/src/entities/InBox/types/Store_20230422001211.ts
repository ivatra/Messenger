import { IMessage } from "../../../shared";
import { IInbox } from "./Model";

interface IReceiveParams {
    page: number
    limit: number
}

export interface IInboxStore {
    pinnedInboxes:IInbox[]
    inboxes: IInbox[]
    inboxesTotalCount: number
    pin: (id: number) => void
    receive: ({ page, limit}: IReceiveParams) => void
    receivePinned:() => void
    updateMessage: (message: IMessage, inboxId: number) => void
}