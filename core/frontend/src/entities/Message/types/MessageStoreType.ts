import { FileWithPath } from "@mantine/dropzone"

import { IDictMessage, IMessage } from "./MessageModel"
import { SharedTypes } from "../../../shared"

export interface IMessageStoreVariables extends SharedTypes.IStoreFeedback {
    messages: {
        ['byId']: IDictMessage,
        ['idByChatId']: {
            [chatId: number]: Set<number>
        }
    }
}

export interface IMessageStoreActions {
    receiveByOffset: (chatId: number, offset: number, limit: number) => void
    receiveById: (msgId: number) => void

    sendMessage: (userId: string, chatId: number, message: string, attachement?: FileWithPath) => void

    setMessageRead: (msgId: number) => void
    addMessage: (chatId: number, message: IMessage) => void;
}

export type IMessageStore = IMessageStoreActions & IMessageStoreVariables