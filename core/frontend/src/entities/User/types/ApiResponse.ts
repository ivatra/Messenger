import { IProfile } from "./Model"


export interface IAuthApiResponse{
    token:string
    profile:IProfile & {isActivated:boolean}
}


export interface ICheckActivationResponse{
    isActivated:boolean
}


export interface IActivateAccResponse{
    activatedPersonId:string
}