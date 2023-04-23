import { IContact } from "./Model";



export interface IReceiveContactsResponse{
    data:IContact[]
    count:number
}