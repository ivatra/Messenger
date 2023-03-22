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
    isSessionExpired: boolean
    setSessionExpired: (value: boolean) => void
    register: (name: string, log: string, email: string, pass: string, avatar: ImageBitmap) => void
    login: (email: string, pass: string) => void
    logout: () => void
    activate: (link: string) => void
    refreshActivation: () => void
}

export type { IUserStore, UpdateProfileParams, ProfileField as ProfileFields }