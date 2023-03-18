import ky from "ky";
import { notifications } from "@mantine/notifications";
import { AlertStyles, API_URL } from "../../../shared";
import { tokenName } from "../../../shared/consts/consts";
import useCaptchaStore from "../../../features"
import { useUserStore } from "../../../entities";

export const setHeader = (request: Request) => {
    const token = localStorage.getItem('accessToken');
    request.headers.set('Authorization', `${tokenName} ${token}`);
};

export const refreshToken = async (request: Request, response: Response) => {
    const token = await ky.get(API_URL + 'auth/refreshToken', { throwHttpErrors: false, credentials: "include", }).text();

    if (token) {
        localStorage.setItem('accessToken', token);
        return ky(request);
    }

    useUserStore.getState().setSessionExpired(true)
    return response;
};

export const showAlertMessage = async (response: Response) => {
    const responseBody = await response.text(); // Read the response body as a string
    const error = JSON.parse(responseBody); // Parse the response body into a JSON object
    notifications.show({
        ...AlertStyles[response.status],
        message: error.message,
    });
};

export const showCaptcha = () => useCaptchaStore.getState().setCaptcha(true)
