import { IAttachement, IDictAttachement } from "./AttachementModel"

import { SharedTypes } from "../../../shared"


export interface IAttachementStoreVariables extends SharedTypes.IStoreFeedback {
    attachements: {
        ['byId']: IDictAttachement,
        ['idByChatId']: {
            [chatId: number]: Set<number>
        }
    }
}


export interface IAttachementStoreActions {
    receiveByOffset: (chatId:number,limit: number, offset: number) => void
    receiveById: (attachId: number) => void
    sendAttachement: (chatId:number,attachment: IAttachement) => void
}

export type IAttachementStoreType = IAttachementStoreActions & IAttachementStoreVariables