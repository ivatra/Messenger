import { SharedTypes } from "../../../shared"


export type IContactStatus = 'pending' | 'accepted' | 'outgoing' | null

export interface IContact {
    id: number
    userId:string
    status: IContactStatus
}

export interface IDictContact{
    [contactId:number]:IContact
}