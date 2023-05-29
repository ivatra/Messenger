import { IInbox } from "./InboxModel";


export interface IInboxesResponse {
    inboxes: IInbox[] | []
    count: number
}
