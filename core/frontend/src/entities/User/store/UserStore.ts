import { create } from "zustand";
import { persist } from "zustand/middleware"
import { immer } from 'zustand/middleware/immer'

import { IUserStore } from "../types/Store";
import { SharedTypes, SharedHelpers, SharedConsts } from "../../../shared";
import { api } from "../../../app";
import { IProfile } from "../types/Model";
import { IActivateAccResponse, IAuthApiResponse, ICheckActivationResponse } from "../types/ApiResponse";

const initialState = {
    profile: { id: '', name: '', avatar: '', login: '', email: '' },
    isAuth: false,
    isActivated: false,
    isSessionExpired: false,
    isAnotherAccountActivated: false,
    isLoading: false,
    isError: false
}

type StoreType = IUserStore & SharedTypes.IStoreFeedback

export const useUserStore = create<StoreType>()(
    persist(
        immer((set, get) => ({
            ...initialState,
            setSessionExpired: (value) => {
                set(initialState)
                set({ isSessionExpired: value })
            },
            setProfile: (newProfile) => set({ profile: newProfile }),
            logout: async () => {
                set(initialState)

                const request = () => api.post("auth/logout")

                const response = await SharedHelpers.handleRequest(request, set)

                if (!response) return

                window.location.href = SharedConsts.WEBSITE_URL + '/auth'
            },
            updateProfile: async (field, value) => {
                const formData = new FormData();
                formData.append(field, value);

                const request = () => api.post("content/profile/update", {
                    body: formData
                })

                const complementedProfile = await SharedHelpers.handleRequest(request, set)

                if (!complementedProfile) return

                const [updatedProfile, isCommon] = SharedHelpers.extractCommonFields<IProfile>(initialState.profile, complementedProfile)

                if (isCommon) set({ profile: updatedProfile as IProfile }) // I claim it's safe!
            },

            activate: async (link) => {
                const { id } = get().profile

                const request = () => api.post(`auth/activate/${link}/?userId=${id}`)

                const response = await SharedHelpers.handleRequest<IActivateAccResponse>(request, set)

                if (!response) return

                if (id && id === response.activatedPersonId) {
                    set({ isActivated: true })
                } else {
                    set({ isAnotherAccountActivated: true })
                }

            },
            checkActivation: async () => {
                const request = () => api.get("auth/activation")

                const response = await SharedHelpers.handleRequest<ICheckActivationResponse>(request, set)

                if (!response) return

                set({ isActivated: response.isActivated })

            },
            refreshActivation: async () => {
                const request = () => api.get("auth/refreshActivation")

                const response = await SharedHelpers.handleRequest<string>(request, set)

                if (!response) return
            },
            login: async (email, pass) => {
                const formData = new FormData();

                formData.append('email', email)
                formData.append('password', pass)

                const request = () => api.post("auth/login", {
                    body: formData
                })

                const response = await SharedHelpers.handleRequest<IAuthApiResponse>(request, set)

                if (!response) return

                localStorage.setItem('accessToken', response.token);

                set({
                    profile: response.profile,
                    isActivated: response.profile.isActivated,
                    isAuth: true
                })

                window.location.href = SharedConsts.WEBSITE_URL + '/chat'
            },
            register: async (name, login, email, pass, avatar) => {
                // name = 'ivatra'
                // login = 'ivatra'
                // email = 'ivatra@yandex.ru'
                // pass = '12345'

                const formData = new FormData();
                formData.append('name', name)
                formData.append('login', login)
                formData.append('email', email)
                formData.append('password', pass)

                if (avatar) {
                    formData.append('avatar', avatar, avatar.name)
                }
                console.log(formData)
                const request = () => api.post("auth/registration", {
                    body: formData
                })

                const response = await SharedHelpers.handleRequest<IAuthApiResponse>(request, set)

                if (!response) return

                localStorage.setItem('accessToken', response.token);

                set({
                    profile: response.profile,
                    isActivated: false,
                    isAuth: true
                })

                window.location.href = SharedConsts.WEBSITE_URL + '/chat'
            }

        })), {
        name: 'UserStore',
        partialize: (state) => ({
            profile: state.profile,
            isActivated: state.isActivated,
            isAuth: state.isAuth
        })
    }))

