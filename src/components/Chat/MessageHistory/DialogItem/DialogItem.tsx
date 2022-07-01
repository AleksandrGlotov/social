import React from 'react';
import { ChatMessageType } from '../../ChatPage';
import s from '../../Chat.module.scss'

const DialogItem: React.FC<{message: ChatMessageType}> = React.memo( ({message}) => {
    return (
        <div className={s.item} >
            <img className={s.ava} src={message.photo}></img>
            <div className={s.body}>
                <div className={s.name}>{message.userName}</div>
                <div>{message.message}</div>
            </div>
        </div>
    )
})

export default DialogItem;