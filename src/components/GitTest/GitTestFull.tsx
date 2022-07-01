import s from './style.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

type SearchUserType = {
    login: string
    id: number
}

type SearchResultType = {
    items: SearchUserType[]
}

type UserDetailsType = {
    login: string
    avatar_url: string
    id: number
    followers: number
}

export const GitTest: React.FC = () => {

    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
    const [userDetails, setUserDetails] = useState<null | UserDetailsType>(null)
    const [users, setUsers] = useState<SearchUserType[]>([])
    const [tempSeacrh, setTempSearch] = useState('AlexGlot')
    const [searchTerm, setSearchTerm] = useState('AlexGlot')

    useEffect( () => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    useEffect( () => {
        axios
            .get<SearchResultType>(`https://api.github.com/search/users?q=${searchTerm}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [searchTerm])

    useEffect( () => {
        if (!!selectedUser) {
            axios
                .get<UserDetailsType>(`https://api.github.com/users/${selectedUser.login}`)
                .then(res => {
                    setUserDetails(res.data)
                })
            }    
    }, [selectedUser])

    return (
        <div className={s.container}>
            <div>
                <input
                    placeholder="search"
                    value={tempSeacrh}
                    onChange={(e) => {
                        setTempSearch(e.currentTarget.value)
                    }}
                />
                <button onClick={ () => {
                    setSearchTerm(tempSeacrh)
                }} >
                    find
                </button>
                <ul>
                    {users.map( i =>
                        <li key={i.id}
                            className={selectedUser === i ? s.selected : ''}
                            onClick={ () => {
                                setSelectedUser(i)
                            }}>
                            {i.login}
                        </li>
                    )}
                </ul>
            </div>
            {userDetails &&
                <div>
                    <h1>{userDetails.login}</h1>
                    <img src={userDetails.avatar_url} ></img>
                    <h4>followers: {userDetails.followers}</h4>
                </div>}
        </div>
    )
}