import { UserType } from "../types/types"
import { instance, APIResponseType } from "./api"

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
        .then(res => res.data)
    },

    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
        .then(res => res.data)
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
        .then(res => res.data) as Promise<APIResponseType>
    }
}
