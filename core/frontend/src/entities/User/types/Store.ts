import { IProfile } from "./Model";


type ProfileField = keyof IProfile | 'password'

interface UpdateProfileParams {
    field: ProfileField
    value: string | File
}

interface IUserStore extends IAuthStore {
    profile: IProfile;
    setProfile: (user: IProfile) => void;
    updateProfile: (
        field: ProfileField,
        value: string | File
    ) => Promise<void>;
}

interface IAuthStore {
    isAuth: boolean
    isActivated:boolean
    isAnotherAccountActivated:boolean
    isSessionExpired: boolean
    setSessionExpired: (value: boolean) => void
    register: (name: string, log: string, email: string, pass: string, avatar: File | null) => void
    login: (email: string, pass: string) => void
    logout: () => void
    activate: (link: string) => void
    checkActivation:() => void
    refreshActivation: () => void
}

export type { IUserStore, UpdateProfileParams, ProfileField as ProfileFields }