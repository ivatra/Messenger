import ky from "ky"

import { API_URL } from "../../../shared"
import { setHeader, refreshToken, showAlertMessage, showCaptcha } from "./middlewares";

export const alertStatusCodes = [500, 403, 400]

export var api = ky.create({
    prefixUrl: API_URL,
    timeout: 5000,
    retry: 1,
    throwHttpErrors: false,
    hooks: {
        beforeRequest: [setHeader],
        afterResponse: [
            async (request, options, response) => {
                if (response.ok) return response

                else if (alertStatusCodes.includes(response.status)) {
                    await showAlertMessage(response)
                }

                else if (response.status === 401) {
                    return await refreshToken(request,response)
                }

                else if (response.status === 429){
                    showCaptcha()
                }

                return response
            }

        ]
    }
})