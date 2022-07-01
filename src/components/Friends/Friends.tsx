import React, { useEffect } from 'react';
import s from './Friends.module.scss'
import Pagination from '../common/Pagination/Pagination';
import FriendCard from './FriendCard/FriendCard';
import UsersSearchForm from '../Forms/UsersSearchForm';
import { getUsers, follow as _follow , unfollow as _unfollow, actions, UserFilterType } from '../../Redux/friendsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsersFilter, getUsersSearchFilter } from '../../Redux/usersSelector';
import { AppDispatch } from '../../Redux/redux-store';
import { useSearchParams } from 'react-router-dom';

type Props = {

}

export const Friends: React.FC<Props> = (props) => {

    const users = useSelector(getUsersFilter)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersSearchFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch: AppDispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter));
        actions.setCurrentPage(pageNumber);
    }

    const onFilterChanged = (filter: UserFilterType) => {
        dispatch(getUsers(1, pageSize, filter));
    }

    const follow = (userId: number) => {
        dispatch(_follow(userId))
    }

    const unfollow = (userId: number) => {
        dispatch(_unfollow(userId))
    }

    useEffect(() => {
        let term = searchParams.get("term")
        let friend = searchParams.get("friend")
        let page = searchParams.get("page")

        let actualPage = currentPage
        let actualFilter = filter

        if (!!page) {
            actualPage = +page
        }

        if (!!term) {
            actualFilter = {...actualFilter, term: term}
        }

        if (!!friend) {
            actualFilter = {...actualFilter,
                friend: friend === "null" ? null
                : friend === "true" ? true : false
            }
        }

        dispatch(getUsers(actualPage, pageSize, actualFilter));
    }, [])

    useEffect(() => {
        setSearchParams(`?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`)
    }, [filter, currentPage])


    return (
        <div>
            <h1>Friends</h1>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <div className={s.list}>
                {
                    users.map( u => <FriendCard 
                        key={u.id}
                        user={u}
                        followingInProgress={followingInProgress}
                        unfollow={unfollow}
                        follow={follow} />
                    )
                }
            </div> 
            <Pagination 
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
            />
        </div>
    )
}