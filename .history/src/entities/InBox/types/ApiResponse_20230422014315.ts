import { IInbox } from "./Model";


export interface IInboxesResponse {
    inboxes: IInbox[] | []
    count: number
}

export type IPinnedInboxesResponse = IInbox[] | []

export type IMatchedInboxesResponse = IInbox[] | []