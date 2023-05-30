import { IDictUser } from "./UserModel";

import { SharedTypes } from "../../../shared";


export interface IUserStoreVariables extends SharedTypes.IStoreFeedback {
    users: IDictUser
}

export interface IUserStoreActions {
    receiveById: (userId: string) => void
}


export type IUserStore = IUserStoreActions & IUserStoreVariables