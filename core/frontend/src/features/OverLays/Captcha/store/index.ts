import { create } from "zustand";
import { ICaptcha } from "../types/Store";


const initialState = {
    id: '', answer: '', isCaptcha: false
}

const useCaptchaStore = create<ICaptcha>()((set) => ({
    ...initialState,
    setAnswer: async (answer) => {

    },
}))

export default useCaptchaStore