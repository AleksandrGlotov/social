import s from './GitTest.module.scss'
import { useState } from 'react';
import { SearchUserType } from './GitTest';
import { useEffect } from 'react';

type TimerPropsType = {
    selectedUser: SearchUserType | null
    seconds: number
    onChange: (actualSeconds: number) => void
}

export const Timer:React.FC<TimerPropsType> = (props) => {
    const [seconds, setSeconds] = useState(props.seconds)
    
    useEffect(() => {
        setSeconds(props.seconds)
    },[props.seconds])

    useEffect(() => {
        props.onChange(seconds)
    },[seconds])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds((prev) => prev - 1)
        }, 1000)

        return () => {
            clearInterval(intervalId) 
        }
    },[props.selectedUser])

    return (
        <div className={s.timer}>
            {seconds}
        </div>
    )
}