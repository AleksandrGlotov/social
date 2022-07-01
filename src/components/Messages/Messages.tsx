import React from 'react';
import s from './Messages.module.scss'
import MessageItem from './MessageItem/MessageItem';
import DialogItem from './DialogItem/DialogItem';
import AddMassageForm from '../Forms/AddMassageForm';
import { useSelector } from 'react-redux';
import { getDialogs, getMessages } from '../../Redux/messageSelector';
import { getIsAuth } from '../../Redux/usersSelector';
import { Navigate } from 'react-router';

type Props = {

}

const Messages: React.FC = () => {

    const messages = useSelector(getMessages)
    const dialogs = useSelector(getDialogs)
    const isAuth = useSelector(getIsAuth)

    let messageElmements = messages.map( (m, index: number) => <MessageItem name={m.name} id={m.id} key={index} /> )

    let dialogElements = dialogs.map ( (d, index: number) => <DialogItem message={d.message} key={index} /> )

    if (!isAuth) {
        return <Navigate to={'/login'} />
    }

    return (
        <div >
            <h2 className={s.h2}>Messages</h2>
            <div className={s.messages}>
                <div className={s.names}>
                    {messageElmements}
                </div>
                <div className={s.dialogs}>
                    <div className={s.dialogContainer}>
                        {dialogElements}
                    </div>
                    <AddMassageForm />
                </div>
            </div>
        </div>
    )
}

export default Messages;