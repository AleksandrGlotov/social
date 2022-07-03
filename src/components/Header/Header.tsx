import React from 'react';
import s from './Header.module.scss'
import { NavLink } from 'react-router-dom';
import { getIsAuth, getLogin } from '../../Redux/usersSelector';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Redux/redux-store';
import { signOut } from '../../Redux/authReducer';

const Header: React.FC = () => {

    const login = useSelector(getLogin)
    const isAuth = useSelector(getIsAuth)

    const dispatch: AppDispatch = useDispatch()

    const logOut = () => {
        dispatch(signOut())
    } 

    return (
        <header className={s.header}>
            <a href='/' className={s.logo}>turbotop</a>
            <div className={s.loginBlock}>
                {isAuth 
                ? <div>
                    <span className={s.profileInfo}>{login}</span>
                    <a className={s.logout} onClick={logOut}>LogOut</a>
                </div >  
                : <NavLink to={'/'}>Login</NavLink>}
                
            </div>

        </header>
    )
}

export default Header;