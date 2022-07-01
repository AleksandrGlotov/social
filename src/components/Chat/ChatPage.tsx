import { Fragment, useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router";
import { startMessagesListening, stopMessagesListening } from '../../Redux/chatReducer';
import { AppDispatch, AppStateType } from "../../Redux/redux-store";
import { getIsAuth } from "../../Redux/usersSelector";
import { MessagesHistory } from "./MessageHistory/MessageHistory";
import { SendMassageForm } from "./SendMessageForm/SendMessageHistory";

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return (
        <div>
            <h1>Chat</h1>
            <Chat />
        </div>
    )
}

export const Chat: React.FC = () => {

    const dispatch: AppDispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    const isAuth = useSelector(getIsAuth)

    

    useEffect( () => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    if (!isAuth) {
        return <Navigate to={'/login'} />
    }

    return (
        <Fragment>
            {status === 'error' && <div>Some error. Please refresh the page</div>}
            <MessagesHistory />
            <SendMassageForm />
        </Fragment>
    )
}

export default ChatPage