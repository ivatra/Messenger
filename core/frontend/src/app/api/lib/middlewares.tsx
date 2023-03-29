import ky from "ky";
import { notifications } from "@mantine/notifications";

import { API_URL } from "../../../shared";
import { tokenName } from "../../../shared/consts";
import { useCaptchaStore } from "../../../features"
import { useUserStore } from "../../../entities";
import { AlertStyles } from "../types/AlertStyles";

export const setHeader = (request: Request) => {
    const token = localStorage.getItem('accessToken');
    request.headers.set('Authorization', `${tokenName} ${token}`);
};

export const refreshToken = async (request: Request, response: Response) => {
    try {
        const token: string = await ky.get(
            API_URL + 'auth/refreshToken', {
            credentials: "include",
        }).json()

        localStorage.setItem('accessToken', token);
        return ky(request);
    } catch (e) {
        useUserStore.getState().setSessionExpired(true)
        return response;
    }
};

export const showAlertMessage = async (response: Response) => {
    const error = await response.json();
    notifications.show({
        ...AlertStyles[response.status],
        message: error.message,
    });
};

export const showInternal = async () => {
    notifications.show({
        ...AlertStyles[500],
        message: 'Could access to server. Try again later.'
    });
};

export const showCaptcha = () => useCaptchaStore.getState().setCaptcha(true)
