import { create } from "zustand";
import { persist } from "zustand/middleware"
import { immer } from 'zustand/middleware/immer'

import { IUserStore } from "../types/Store";
import { IStoreFeedback } from "../../../shared"
import handleRequest from "../../../shared/lib/handleRequest";
import { api } from "../../../app";
import { IProfile } from "../types/Model";
import { extractCommonFields } from "../../../shared/lib/extractCommonFields";

const initialState = {
    profile: { id: '', name: '', avatar: '', login: '' },
    isAuth: false,
    isSessionExpired: false,
    isLoading: false,
    isError: false
}

type StoreType = IUserStore & IStoreFeedback


const useUserStore = create<StoreType>()(
    persist(
        immer((set, get) => ({
            ...initialState,
            setSessionExpired: (value) => set({ isSessionExpired: value }),
            setProfile: (newProfile) => set({ profile: newProfile }),
            logout: () => set(initialState),
            updateProfile: async (field, value) => {
                const formData = new FormData();
                formData.append(field, value);

                const request = () => api.post("content/profile/update", {
                    body: formData
                })

                const response = await handleRequest(request, set);

                if (!response || get().isError) return
 
                const apiResponse = await response.json()

                const [updatedProfile, isCommon] = extractCommonFields<IProfile>(initialState.profile, apiResponse)

                if (isCommon) set({ profile: updatedProfile as IProfile }) // I claim it's safe!
            },

            activate: (link) => { },
            refreshActivation: () => set(state => {

            }),

            login: (email, pass) => { console.log('hello') },
            register: (name, log, email, pass, avatar) => { }

        })), {
        name: 'UserStore',
        partialize: (state) => ({
            profile: state.profile,
            isAuth: state.isAuth
        })
    }))

export default useUserStore
