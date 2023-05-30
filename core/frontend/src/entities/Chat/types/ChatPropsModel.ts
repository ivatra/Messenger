export interface IGroupChatProps {
    type: 'group';
    participantsCount: number;
    role: 'USER' | 'ADMIN';
}

export interface IIndividualChatProps {
    type: "individual";
}
export type ChatProps = IIndividualChatProps | IGroupChatProps;
