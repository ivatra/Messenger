import { FileWithPath } from "@mantine/dropzone";
import { IListMessage } from "../types/Model";
import { SharedTypes } from "../../../shared";

export function createMessage(userId: string, index: number, attachement: FileWithPath | undefined, message: string): IListMessage {
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newAttachement: SharedTypes.IAttachement | undefined = attachement
        ? {
            id: index,
            type: 'image',
            url: URL.createObjectURL(attachement),
        }
        : undefined;

    const newMessage: IListMessage = {
        id: index,
        content: message,
        senderId: userId,
        status: 'loading',
        ...(newAttachement && { attachement: newAttachement }),
        isRead: false,
        createdAt: createdAt,
        updatedAt: updatedAt,
        index: index,
    };

    return newMessage;
}