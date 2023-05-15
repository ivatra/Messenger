import ky from "ky";

import { useCaptchaStore } from "../../../features"
import { useUserStore } from "../../../entities";
import { sharedConsts } from "../../../shared";

export const setHeader = (request: Request) => {
    const token = localStorage.getItem('accessToken');
    request.headers.set('Authorization', `${sharedConsts.tokenName} ${token}`);
};

export const refreshToken = async (request: Request, response: Response) => {
    try {
        const token: string = await ky.get(
            sharedConsts.API_URL + 'auth/refreshToken', {
            credentials: "include",
        }).json()

        localStorage.setItem('accessToken', token);
        return ky(request);
    } catch (e) {
        useUserStore.getState().setSessionExpired(true)
        return response;
    }
};

export const showCaptcha = () => useCaptchaStore.getState().setCaptcha(true)
