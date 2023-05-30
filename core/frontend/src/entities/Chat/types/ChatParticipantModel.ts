export interface IDictChatParticipant {
    [participantId: number]: IChatParticipant;
}

export interface IChatParticipant {
    id: number;
    userId: string;
    role: 'ADMIN' | 'USER';
}
