import { create } from "zustand";
import { ICaptcha } from "../types/Store";
import { SharedTypes, SharedHelpers } from "../../../../shared";
import { devtools } from "zustand/middleware";
import api from "../../../../app/api/api";


const initialState = {
    id: '',
    answer: '',
    isCaptcha: false,
    svgData: '',
    isLoading: false,
    isError: false
}

interface ICaptchaResponse {
    id: string
    data: string
}

export const useCaptchaStore = create<ICaptcha & SharedTypes.IStoreFeedback>()(devtools((set, get) => ({
    ...initialState,
    receiveCaptcha: async () => {
        const request = () => api.get('captcha')

        const captcha = await SharedHelpers.handleRequest<ICaptchaResponse>(request, set)

        if (!captcha) return

        set({ id: captcha.id, svgData: captcha.data })
    },
    verifyAnswer: async (answer) => {

        const request = () => api.post('captcha', {
            json: {
                id: get().id,
                answer: answer
            }
        })

        await SharedHelpers.handleRequest(request, set)

        if (!get().isError) set(initialState)
    },
    setCaptcha: (value) => set({ isCaptcha: value })
})))
