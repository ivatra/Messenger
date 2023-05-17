import { SharedTypes } from "../../../shared"


export type IContactStatus = 'pending' | 'accepted' | 'outgoing' | null

export interface IContact extends SharedTypes.IUser {
    id: string
    status: IContactStatus
}
