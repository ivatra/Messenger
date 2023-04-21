import { IContact, ISearchedContact } from "./Model";



export interface IReceiveContactsResponse{
    data:IContact[]
    count:number
}

export interface ISearchContactsResponse{
    data:ISearchedContact[]
    count:number
}