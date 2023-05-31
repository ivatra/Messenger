export interface IParticipantAction {
    type: "Removed" | "Added";
    causeId: string;
    victimId: string;
}

export type IChatAction = {
    id: number;
} & (IParticipantAction);

