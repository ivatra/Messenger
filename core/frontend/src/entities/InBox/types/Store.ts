import { IMessage } from "../../../shared";
import { IInbox } from "./Model";

export interface IInboxStore{
    inboxes:IInbox[]
    pin: () => void
    receive:() => void
    updateMessage:(message:IMessage) => void
}