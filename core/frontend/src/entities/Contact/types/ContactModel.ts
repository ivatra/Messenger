

export type IContactStatus = 'pending' | 'accepted' | 'outgoing'

export type IContactFilters = 'all' | 'accepted' | 'pending' | 'outgoing'

export interface IContact {
    id: number
    userId:string
    status: IContactStatus
}

export interface IDictContact{
    [contactId:number]:IContact
}

export interface IDictContactIdByUserId{
    [userId:string]:number | null
}