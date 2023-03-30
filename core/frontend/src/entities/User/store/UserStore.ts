import { create } from "zustand";
import { persist } from "zustand/middleware"
import { immer } from 'zustand/middleware/immer'

import { IUserStore } from "../types/Store";
import { IStoreFeedback, handleRequest, extractCommonFields } from "../../../shared"
import { api } from "../../../app";
import { IProfile } from "../types/Model";

const initialState = {
    profile: { id: '', name: '', avatar: '', login: '' },
    isAuth: false,
    isSessionExpired: false,
    isLoading: false,
    isError: false
}

type StoreType = IUserStore & IStoreFeedback

export const useUserStore = create<StoreType>()(
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

                const complementedProfile = await handleRequest(request, set)

                if (!complementedProfile) return

                const [updatedProfile, isCommon] = extractCommonFields<IProfile>(initialState.profile, complementedProfile)

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

