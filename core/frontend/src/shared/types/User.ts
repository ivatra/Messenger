export default interface IUser {
    id: string
    name: string
    login: string
    avatar: string
    isActive: boolean
    lastSeen: Date | null
}
