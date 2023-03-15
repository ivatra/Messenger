import { create } from "zustand";
import { persist } from "zustand/middleware"
import { immer } from 'zustand/middleware/immer'

import IUserStore from "../types/Store";
import { IStoreFeedback } from "../../../shared"

const initialState = {
    profile: { id: '', name: '', avatar: '', login: '' },
    isAuth: false,
    isSessionExpired:false
}

const useUserStore = create<IUserStore & IStoreFeedback>()(
    persist(
        immer((set) => ({
            isLoading: false,
            error: '',
            ...initialState,
            setSessionExpired:(value) => set({isSessionExpired:value}),
            setProfile: (newProfile) => set({ profile: newProfile }),
            updateProfile: async (updateFields) => { },

            activate:(link) => {},
            refreshActivation: () => set(state => {

            }),

            login:(email,pass) => {console.log('hello')},
            logout: () => set(initialState),
            register:(name, log, email, pass, avatar) =>{}

        })), {
        name: 'UserStore',
        partialize: (state) => ({
            profile: state.profile,
            isAuth: state.isAuth
        })
    }))

export default useUserStore
