import { instance } from "./api"

type GetCaptchaUrlResponse = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponse>(`security/get-captcha-url`)
        .then(res => res.data)
    }
}