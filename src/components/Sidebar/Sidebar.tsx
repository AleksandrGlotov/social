import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Sidebar.module.scss'

const Sidebar: React.FC = () => {
    return (
        <nav className={s.sidebar}>
            <NavLink to="/profile" className={({ isActive }) => isActive ? s.activeLink : ""}>Profile</NavLink>
            <NavLink to="/friends" className={({ isActive }) => isActive ? s.activeLink : ""}>Friends</NavLink>
            <NavLink to='/chat' className={({ isActive }) => isActive ? s.activeLink : ""}>Group Chat</NavLink>
            <NavLink to="/messages" className={({ isActive }) => isActive ? s.activeLink : ""}>Messages</NavLink>
            {/* <NavLink to='/news' className={({ isActive }) => isActive ? s.activeLink : ""}>News</NavLink> */}
            {/* <NavLink to='/music' className={({ isActive }) => isActive ? s.activeLink : ""}>Music</NavLink> */}
            {/* <NavLink to='/settings' className={({ isActive }) => isActive ? s.activeLink : ""}>Settings</NavLink> */}
            <NavLink to='/test' className={({ isActive }) => isActive ? s.activeLink : ""}>Github</NavLink>
        </nav>
    )
}

export default Sidebar;