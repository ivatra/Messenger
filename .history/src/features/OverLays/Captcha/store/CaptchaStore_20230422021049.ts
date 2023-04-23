import { create } from "zustand";
import { ICaptcha } from "../types/Store";
import { IStoreFeedback, handleRequest } from "../../../../shared";
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

export const useCaptchaStore = create<ICaptcha & IStoreFeedback>()(devtools((set, get) => ({
    ...initialState,
    receiveCaptcha: async () => {
        const request = () => api.get('captcha')

        const captcha = await handleRequest<ICaptchaResponse>(request, set)

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

        await handleRequest(request, set)

        if (!get().isError) set(initialState)
    },
    setCaptcha: (value) => set({ isCaptcha: value })
})))
