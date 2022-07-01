import s from './GitTest.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { SearchUserType } from './GitTest';


type SearchResultType = {
    items: SearchUserType[]
}

type UsersListType = {
    searchTerm: string
    selectedUser: SearchUserType | null
    onUserSelect: (user: SearchUserType) => void
}

export const GitList: React.FC<UsersListType> = (props) => {

    const [users, setUsers] = useState<SearchUserType[]>([])

    useEffect( () => {
        axios
            .get<SearchResultType>(`https://api.github.com/search/users?q=${props.searchTerm}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [props.searchTerm])

    return (
        <ul>
            {users.map( i =>
                <li key={i.id}
                    className={props.selectedUser === i ? s.selected : ''}
                    onClick={ () => {
                        props.onUserSelect(i)
                    }}>
                    {i.login}
                </li>
            )}
        </ul>
    )
}