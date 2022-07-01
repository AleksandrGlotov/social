import { PhotosType, ProfileType } from "../types/types";
import { instance, ResultCodes, APIResponseType } from "./api";

type SavePhotoDataResponseType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
        .then(res => res.data)
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
        .then(res => res.data)
    },

    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status})
        .then(res => res.data)
    },

    savePhoto(photos: File) {
        const formData = new FormData();
        formData.append('image', photos)
        return instance.put<APIResponseType<SavePhotoDataResponseType>>(`profile/photo`, formData, {
            headers: 
                {'Content-type': 'multipart/form-data'}
        }).then(res => res.data)
    },

    saveProfileData(profileData: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profileData)
        .then(res => res.data)
    },

}