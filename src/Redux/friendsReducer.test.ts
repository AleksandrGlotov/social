import friendsReducer, { actions, InitialStateType } from "./friendsReducer"

let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {id: 0, name: 'Glot 0', followed: false,
            photos: {small: null, large: null}, status: 'status 0'},
            {id: 1, name: 'Glot 1', followed: false,
            photos: {small: null, large: null}, status: 'status 1'},
            {id: 2, name: 'Glot 2', followed: true,
            photos: {small: null, large: null}, status: 'status 2'},
            {id: 3, name: 'Glot 3', followed: true,
            photos: {small: null, large: null}, status: 'status 3'}],
        pageSize: 12,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {
            term: '',
            friend: null
        }
    }

})

test('follow success', () => {
    
    const newState = friendsReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {

    const newState = friendsReducer(state, actions.unfollowSuccess(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[1].followed).toBeFalsy()
})