import { IProfile } from "./ProfileModel";


export type ProfileField = keyof IProfile | 'password' 

export type UpdateTextParams = {
    field: ProfileField
    value: string
}

interface UpdateAvatarParams{
    field:'avatar'
    value:string
}

export type UpdateProfileParams = UpdateTextParams | UpdateAvatarParams


export interface IProfileStore extends IAuthStore {
    profile: IProfile;
    setProfile: (user: IProfile) => void;
    updateProfile: ({ field, value }: UpdateProfileParams) => void;
}

export interface IAuthStore {
    isAuth: boolean
    isActivated: boolean
    isAnotherAccountActivated: boolean
    isSessionExpired: boolean
    setSessionExpired: (value: boolean) => void
    register: (name: string, log: string, email: string, pass: string, avatar: File | null) => void
    login: (email: string, pass: string) => void
    logout: () => void
    activate: (link: string) => void
    checkActivation: () => void
    refreshActivation: () => void
}
