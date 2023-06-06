;import { IListAttachement, IListMessage } from "./Model";


export interface IMessagesApiResponse{
    data:IListMessage[]
    count:number
}

export interface IAttachementsApiResponse{
    data:IListAttachement[]
    count:number
}