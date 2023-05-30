import { IUser } from "../../User/types/UserModel"

export type IProfile = Omit<IUser,'isActive' | 'lastSeen' > & {email:string}