export default interface IUser {
    id: string
    name: string
    login: string
    avatar: string | null
    isActive: boolean
    lastSeen: Date | null
}
