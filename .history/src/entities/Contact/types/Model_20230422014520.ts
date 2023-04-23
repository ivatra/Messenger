import { IUser } from "../../../shared"


export type IContactStatus = 'pending' | 'accepted' | 'outgoing' | null

export interface IContact extends IUser {
    id: string
    status: IContactStatus
}

export interface ISearchedContact extends IContact {
    isContact: boolean
}
