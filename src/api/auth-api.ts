import { instance, APIResponseType, ResultCodes, ResultCodeWithCaptcha } from "./api"

type MeResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    userid: number
}

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`)
        .then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodes | ResultCodeWithCaptcha>>(`auth/login`, {email, password, rememberMe, captcha})
        .then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`)
        .then(res => res.data)
    }
}