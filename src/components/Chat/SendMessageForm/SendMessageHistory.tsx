import { useState} from "react"
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from "../../../Redux/chatReducer";
import { AppDispatch, AppStateType } from "../../../Redux/redux-store";
import s from '../Chat.module.scss'

export const SendMassageForm: React.FC = () => {

    const [message, setMessage] = useState('')
    const status = useSelector((state: AppStateType) => state.chat.status)
    const dispatch: AppDispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!message) {
            return
        } 
        dispatch(sendMessage(message))
        setMessage('')   
    }
    return (
        <div className={s.sendMessage} >
            <input onChange={(e) => setMessage(e.currentTarget.value)} value={message}></input>
            <button disabled={status !== 'ready'} onClick={sendMessageHandler}>send</button>
        </div>
    )
}