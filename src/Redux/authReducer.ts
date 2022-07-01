import { ResultCodes, ResultCodeWithCaptcha } from "../api/api";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { BaseThunkType, InferActionsType } from "./redux-store";

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isFetching: true,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {

        case "glot/auth/SET_USER_DATA": {
            return {...state, ...action.data, isAuth: true}
        }

        case "glot/auth/TOGGLE_IS_FETCHING": {
            return {...state, isFetching: action.isFetching}
        }

        case "glot/auth/RESET_AUTH_DATA": {
            return {...state, ...initialState}
        }

        case "glot/auth/GET_CAPTCHA_URL_SUCCESS": {
            return {...state, ...action.data}
        }
        
        default:
            return state;
    }
}

//Action Creators

type ActionsTypes = InferActionsType<typeof actions>

export const actions = {
    setUserData: (id: number, email: string, login: string, isAuth: boolean) => ({ 
        type: 'glot/auth/SET_USER_DATA', 
        data: {id, email, login, isAuth}
    }) as const,
    
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'glot/auth/TOGGLE_IS_FETCHING',
        isFetching
    }) as const,
    
    resetAuthData: () => ({
        type: 'glot/auth/RESET_AUTH_DATA'
    }) as const,
    
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'glot/auth/GET_CAPTCHA_URL_SUCCESS',
        data: {captchaUrl}
    }) as const
}


//Thunk

type ThunkType = BaseThunkType<ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me()
        
    if (meData.resultCode === ResultCodes.Success) {
        let {id, email, login} = meData.data;
        dispatch(actions.setUserData(id, email, login, true))
    }
};

export const signIn = (email: string, password: string, rememberMe: boolean, captcha: string, setFieldValue: any): ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)

    if (loginData.resultCode === ResultCodes.Success) {
        dispatch(getAuthUserData())
    }  else { 
        if (loginData.resultCode === ResultCodeWithCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        } 
        setFieldValue("general", loginData.messages.join(" "))
    }
};

export const signOut = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout()

    if (data.resultCode === ResultCodes.Success) {
        dispatch(actions.resetAuthData())
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer