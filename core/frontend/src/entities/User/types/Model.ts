import {IUser} from "../../../shared"

export type IProfile = Omit<IUser,'isActive' | 'lastSeen'> & {email:string}