import { IMessage } from "../../../shared";

export type IMessageAction = {
    id: number;
} & (IParticipantAction);


export interface IMessageContentItem {
    type: "Message";
    data: IMessage;
}

interface IMessageActionContentItem {
    type: "Action";
    data: IMessageAction;
}

export type IContentItem = IMessageContentItem | IMessageActionContentItem


export interface IParticipantAction {
    type: "Removed" | "Added";
    causeId: string;
    victimId: string;
}
