import { Dispatch } from 'redux';
import { APIResponseType, ResultCodes } from '../api/api';
import { usersAPI } from '../api/users-api';
import { UserType } from '../types/types.js';
import { updateObjectInArray} from '../utils/helpers/objects-helpers'
import { BaseThunkType, InferActionsType } from './redux-store.js';

let initialState = {
    users: [ ] as Array<UserType>,
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, // array of users id
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

export type UserFilterType = typeof initialState.filter
export type InitialStateType = typeof initialState


const friendsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {

        case 'FOLLOW': 
            return {
                ...state,
                users: updateObjectInArray(state.users, action.usersId, 'id', {followed: true})
            }

        case 'UNFOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.usersId, 'id', {followed: false})
            }
        }

        case 'SET_USERS': {
            return {...state, users: [ ...action.users]}
        }

        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }

        case 'SET_USERS_TOTAL_COUNT': {
            return {...state, totalUsersCount: action.totalUsersCount}
        }

        case 'TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }

        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {...state, followingInProgress: action.isFetching
                ? [...state.followingInProgress, action.userId]
                : state.followingInProgress.filter(id => id != action.userId)
            }
        }

        case 'SET_USER_FILTER': {
            return {...state, filter: action.payload}
        }
        
        default:
            return state;
    }
}
    
//ActionCreator

type ActionsTypes = InferActionsType<typeof actions>

export const actions = {
    followSuccess: (usersId: number) => ({ type: 'FOLLOW', usersId } as const),

    unfollowSuccess: (usersId: number) => ({ type: 'UNFOLLOW', usersId } as const),
    
    setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SET_USERS_TOTAL_COUNT', totalUsersCount } as const),
    
    toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    
    toggleIsFollowing: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const),
    
    setUserFilter: (filter: UserFilterType) => ({type: 'SET_USER_FILTER', payload: filter} as const)
} 

// Thunk

type ThunkType = BaseThunkType<ActionsTypes>

export const getUsers = (currentPage: number, pageSize: number, filter: UserFilterType)
: ThunkType => async (dispatch, getState) => {
    
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.setUserFilter(filter))

    let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)

    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
    userId: number, apiMethod: (userId: number) => Promise<APIResponseType>,
    actionCreator: (userId: number) => ActionsTypes) => {

    dispatch(actions.toggleIsFollowing(true, userId));

    let data = await apiMethod(userId)

    if (data.resultCode == ResultCodes.Success) {
        dispatch(actionCreator(userId));
    }

    dispatch(actions.toggleIsFollowing(false, userId));
}
        
export const follow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
};  

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
};  


export default friendsReducer