import { useEffect, useRef, useState} from "react"
import { useSelector } from 'react-redux';
import { AppStateType } from "../../../Redux/redux-store";
import DialogItem from "./DialogItem/DialogItem";
import s from '../Chat.module.scss'

export const MessagesHistory: React.FC = () => {

    const messages = useSelector( (state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(false)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 100) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect( () => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView(true);
        }
    }, [messages]);

    return (
        <div className={s.chatHistory} onScroll={scrollHandler}>
            {messages.map((m, index) => <DialogItem message={m} key={index} /> )}
            <div ref={messagesAnchorRef} ></div>
        </div>
    )
}