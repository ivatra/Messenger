import {SharedTypes} from "../../../shared"

export type IProfile = Omit<SharedTypes.IUser,'isActive' | 'lastSeen'> & {email:string}