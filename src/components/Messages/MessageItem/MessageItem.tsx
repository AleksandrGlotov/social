import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './MessageItem.module.scss'

type Props = {
    id: number
    name: string
}

const MessageItem: React.FC<Props> = (props) => {
    let path = "/messages/" + props.id;

    return (
        <div className={s.name}>
            <NavLink to={path} className={({ isActive }) => isActive ? s.activeDialog : ""}>{props.name}</NavLink>
        </div>
    )
}

export default MessageItem;