import React from 'react';
import s from './DialogItem.module.scss'

type Props = {
    message: string
}

const DialogItem: React.FC<Props> = (props) => {
    return (
        <div className={s.dialog}>{props.message}</div>
    )
}

export default DialogItem;