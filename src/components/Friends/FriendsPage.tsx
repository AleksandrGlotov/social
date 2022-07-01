import React from 'react';
import { useSelector } from 'react-redux';
import s from './Friends.module.scss'
import Preloader from '../common/Preloader/Preloader';
import { getIsAuth, getIsFetching } from '../../Redux/usersSelector';
import { Friends } from './Friends';
import { Navigate } from 'react-router';

type Props = {
    
}

const FriendsPage: React.FC<Props> = (props) => {

    const isFetching = useSelector(getIsFetching)
    const isAuth = useSelector(getIsAuth)

    if (!isAuth) {
        return <Navigate to={'/login'} />
    }

    return (
        <div className={s.preloaderPosition}>
            { isFetching ? < Preloader /> : null }
            <Friends />
        </div>
    )
}

export default FriendsPage