import s from './GitTest.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { SearchUserType } from './GitTest';
import { Timer } from './Timer';


type DetailsPropsType = {
    selectedUser: SearchUserType | null
}

type UserDetailsType = {
    login: string
    avatar_url: string
    html_url: string
    id: number
    followers: number
    created_at: string
}

export const GitDetail: React.FC<DetailsPropsType> = (props) => {

    const [userDetails, setUserDetails] = useState<null | UserDetailsType>(null)
    const [seconds, setSeconds] = useState(10)

    useEffect( () => {
        if (!!props.selectedUser) {
            axios
                .get<UserDetailsType>(`https://api.github.com/users/${props.selectedUser.login}`)
                .then(res => {
                    setSeconds(10)
                    setUserDetails(res.data)
                })
            }    
    }, [props.selectedUser])

    useEffect(() => {
        if (seconds < 1) {
            setUserDetails(null)
        }
    },[seconds])

    return (
        <> 
            {userDetails &&
                <div>
                    <Timer
                        selectedUser={props.selectedUser}
                        seconds={seconds}
                        onChange={setSeconds}/>
                    <h1>{userDetails.login}</h1>
                    <img src={userDetails.avatar_url} ></img>
                    <h4 className={s.detailInfo}><i>Url:</i> {userDetails.html_url}</h4>
                    <h4 className={s.detailInfo}><i>Followers:</i> {userDetails.followers}</h4>
                    <h4 className={s.detailInfo}><i>Created:</i> {userDetails.created_at}</h4>
                </div>}
        </>
    )
}