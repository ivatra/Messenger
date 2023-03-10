import IUser from "@/src/shared"

export interface IContact extends IUser {
    id: string
    status: string
}
