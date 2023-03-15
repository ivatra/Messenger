import { create } from "zustand";
import { ICaptcha } from "../types/Store";
import { IStoreFeedback, api } from "../../../../shared";
import { devtools } from "zustand/middleware";

const initialState = {
    id: '',
    answer: '',
    isCaptcha: false,
    svgData: '',
    isLoading: false,
    error: ''
}

interface ICaptchaResponse {
    id: string
    data: string
}

const useCaptchaStore = create<ICaptcha & IStoreFeedback>()(devtools((set, get) => ({
    ...initialState,
    receiveCaptcha: async () => {
        set({ isLoading: true })

        const response: ICaptchaResponse = await api.get('captcha').json()

        set({ id: response.id, svgData: response.data, isLoading: false })
    },
    verifyAnswer: async (answer) => {
        set({ isLoading: true })

        const response = await api.post('captcha', {
            json: {
                id: get().id,
                answer: answer
            }
        })

        set({ isLoading: false })

        if (response.ok) {
            set(initialState)
        }
    },
    setCaptcha: (value) => set({ isCaptcha: value })
})))

export default useCaptchaStore