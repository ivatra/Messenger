import { IDictUser, IUser } from "./UserModel";

import { SharedTypes } from "../../../shared";


export interface IUserStoreVariables extends SharedTypes.IStoreFeedback {
    users: IDictUser
}

export interface IUserStoreActions {
    receiveById: (userId: string) => void
    receiveBySearchTerm:(searchTerm:string) => Promise<IUser[] | undefined>
}


export type IUserStore = IUserStoreActions & IUserStoreVariables