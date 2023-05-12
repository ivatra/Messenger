import { IAttachement, IMessage } from "../../../shared";

export interface IMessageContentItem {
    type: "Message";
    data: IListMessage;
}

interface IMessageActionContentItem {
    type: "Action";
    data: IMessageAction;
}

export interface IParticipantAction {
    type: "Removed" | "Added";
    causeId: string;
    victimId: string;
}

export type IMessageAction = {
    id: number;
} & (IParticipantAction);


export interface IListMessage extends IMessage{
    index:number
    status?: SentStatuses
    isMentioned?:boolean
    attachement?:IAttachement
}

export type IContentItem = IMessageContentItem | IMessageActionContentItem
export type SentStatuses = 'loading' | 'error' | 'sent'

