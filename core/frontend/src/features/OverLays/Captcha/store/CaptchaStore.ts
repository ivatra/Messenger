import { create } from "zustand";
import { ICaptcha } from "../types/Store";
import { IStoreFeedback } from "../../../../shared";
import { devtools } from "zustand/middleware";
import api from "../../../../app/api/api";
import handleRequest from "../../../../shared/lib/handleRequest";

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

const useCaptchaStore = create<ICaptcha & IStoreFeedback>()(devtools((set, get) => ({
    ...initialState,
    receiveCaptcha: async () => {
        const request = () => api.get('captcha')
        const response = await handleRequest(request, set)

        if (!response) return

        const strResponse: ICaptchaResponse = await response.json()

        set({ id: strResponse.id, svgData: strResponse.data })
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

export default useCaptchaStore