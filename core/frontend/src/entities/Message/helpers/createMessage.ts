import { FileWithPath } from "@mantine/dropzone";

import { IMessage } from "../types/MessageModel";

export function createMockMessage(userId: string, index: number, attachement: FileWithPath | undefined, message: string): IMessage {
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newMessage: IMessage = {
        id: index,
        content: message,
        senderId: userId,
        isMentioned:false,
        status:'loading',
        isRead: false,
        createdAt: createdAt,
        updatedAt: updatedAt,
        index: index,
    };

    return newMessage;
}