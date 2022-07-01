import { actions, follow, unfollow } from "./friendsReducer"
import { usersAPI } from './../api/users-api';
import { APIResponseType, ResultCodes } from "../api/api";
jest.mock('./../api/users-api')

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: APIResponseType = {
    resultCode: ResultCodes.Success,
    messages: [],
    data: {}
}

test('success follow thunk ', async () => {

    userAPIMock.follow.mockReturnValue(Promise.resolve(result))

    const thunk = follow(3)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowing(true, 3))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(3))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowing(false, 3))
})

test('success unfollow thunk ', async () => {

    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

    const thunk = unfollow(3)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowing(true, 3))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(3))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowing(false, 3))
})