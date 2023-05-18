import ky from "ky";

import { useCaptchaStore } from "../../../features"
import { useUserStore } from "../../../entities";
import { SharedConsts } from "../../../shared";

export const setHeader = (request: Request) => {
    const token = localStorage.getItem('accessToken');
    request.headers.set('Authorization', `${SharedConsts.tokenName} ${token}`);
};

export const refreshToken = async (request: Request, response: Response) => {
    try {
        const token: string = await ky.get(
            SharedConsts.API_URL + 'auth/refreshToken', {
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
