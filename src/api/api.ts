import axios from "axios"
import { PhotosType, ProfileType, UserType } from "../types/types";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "ffd65234-00a1-4565-a21f-278b628ec3b8"
    }
});

export enum ResultCodes {
    Success = 0,
    Error = 1
}

export enum ResultCodeWithCaptcha {
    CaptchaIsRequired = 10
}

export type APIResponseType<D  = {}, RC = ResultCodes> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
