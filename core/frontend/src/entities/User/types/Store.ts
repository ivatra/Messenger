import { IProfile } from "./Model";

interface IUserStore extends IAuthStore {
    profile: IProfile
    setProfile: (user: IProfile) => void
    updateProfile: (
        updateFields: Partial<IProfile> & { password?: string } ) => Promise<void>
    
}

interface IAuthStore{
    isAuth: boolean
    isSessionExpired:boolean
    setSessionExpired:(value:boolean) => void
    register: (name: string, log: string, email: string, pass: string, avatar: ImageBitmap) => void
    login: (email: string, pass: string) => void
    logout: () => void
    activate: (link: string) => void
    refreshActivation: () => void
}

export default IUserStore