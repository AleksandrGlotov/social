import React from 'react';
import s from './FriendCard.module.scss'
import { NavLink } from 'react-router-dom';
import noPhoto from '../../../assets/images/noPhoto.webp'
import { UserType } from '../../../types/types';

type Props = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let FriendCard: React.FC<Props> = ({ user, followingInProgress, unfollow, follow }) => {
    return (
        <div className={s.card}>
            <NavLink to={"/profile/" + user.id}>
                <img src={user.photos.small != null ? user.photos.small : noPhoto}></img>
            </NavLink>
            <div className={s.friendInfo}>
                <div className={s.head}>
                    <h3>{user.name}</h3>
                    <div>
                        {user.followed
                            ? <button disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => { unfollow(user.id) }}>Unfollow</button>
                            : <button disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => { follow(user.id) }}>Follow</button>}
                    </div>
                </div>
                <i>{user.status != null ? user.status : ""}</i>
            </div>
        </div>
    )
}


export default FriendCard;