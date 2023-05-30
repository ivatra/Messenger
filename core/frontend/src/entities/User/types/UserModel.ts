export interface IUser {
    id: string
    name: string
    login: string
    avatar: string
    isActive: boolean
    lastSeen: string | null
}

export interface IDictUser{
    [userId:string]:IUser
}