import { ResultCodes } from '../api/api';
import { profileAPI } from '../api/profile-api';
import { PostType, ProfileType, PhotosType } from '../types/types.js';
import { BaseThunkType, InferActionsType } from './redux-store.js';

let initialState = {
    posts: [
        {id: 1, likeCount: 5, text: "Hello", date: '23-05-2021 13:15'},
        {id: 2, likeCount: 2, text: "How are you?", date: '15-06-2021 21:51'},
        {id: 3, likeCount: 666, text: "Welcome to Hell!!!", date: '26-06-2021 19:03'},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        
        case 'glot/profile/ADD-POST': {
            let newPost = {
                id: 4,
                text: action.payload.newPostText,
                likeCount: 0,
                date: action.payload.date
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }

        case 'glot/profile/DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter( p => p.id != action.id)
            };
        }

        case 'glot/profile/SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }

        case 'glot/profile/SET_STATUS': {
            return {...state, status: action.status}
        }

        case 'glot/profile/SAVE_PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType }
        }

        default:
            return state;
        }
}

//Action Creators

type ActionsTypes = InferActionsType<typeof actions>

export const actions = {
    addPost: (newPostText: string, date: string) => ({ type: 'glot/profile/ADD-POST', payload: {newPostText, date} }) as const,

    deletePost: (id: number) => ({ type: 'glot/profile/DELETE_POST', id }) as const,

    setUserProfile: (profile: ProfileType) => ({ type: 'glot/profile/SET_USER_PROFILE', profile}) as const,

    setStatus: (status: string) => ({type: 'glot/profile/SET_STATUS', status}) as const,

    savePhotoSuccess: (photos: PhotosType) => ({type: 'glot/profile/SAVE_PHOTO_SUCCESS', photos}) as const

}

//Thunk

type ThunkType = BaseThunkType<ActionsTypes>

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data));
};
    
export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === ResultCodes.Success) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (photos: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(photos)
    if (data.resultCode === ResultCodes.Success) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfileData = (profileData: ProfileType, setFieldValue: any): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id;
    let data = await profileAPI.saveProfileData(profileData)
    if (data.resultCode === ResultCodes.Success) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error ('UserId can`t be null')
        }
    } else {
        setFieldValue("general", data.messages.join(" "))
    }
}

export default profileReducer