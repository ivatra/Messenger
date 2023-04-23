import { IUser } from "../../../shared"


export interface IContact extends IUser {
    id: string
    status: string
}
