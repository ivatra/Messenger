import { create } from "zustand";
import { persist } from "zustand/middleware"
import { immer } from 'zustand/middleware/immer'

import IProfileStore from "../types/Store";
import { IProfile } from "../types/Model";
import { IStoreFeedback } from "@/src/shared";

const initialState = {
    profile: { id: '', name: '', avatar: '', login: '' }
}

const useProfileStore = create<IProfileStore & IStoreFeedback>()(
    persist(
        immer((set) => ({
            isLoading: false,
            error: '',
            ...initialState,
            setProfile: (newProfile) => set({ profile: newProfile }),
            updateProfile: async (updateFields) => {
                console.log(updateFields)
                
            }

})),{
            name: 'ProfileStore',
            partialize: (state) => ({ profile: state.profile })
}))

export default useProfileStore
