import { IAttachement, IDictAttachement } from "./AttachementModel"

import { SharedTypes } from "../../../shared"


export interface IAttachementStoreVariables extends SharedTypes.IStoreFeedback {
    attachements: IDictAttachement
}


export interface IAttachementStoreActions {
    receiveByOffset: (chatId:number,limit: number, offset: number) => void
    receiveById: (attachId: number) => void
    sendAttachement: (chatId:number,attachment: IAttachement) => void
}

export type IAttachementStoreType = IAttachementStoreActions & IAttachementStoreVariables