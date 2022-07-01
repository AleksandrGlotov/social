import s from './GitTest.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { GitInput } from './GitInput';
import { GitList } from './GitList';
import { GitDetail } from './GitDetail';

export type SearchUserType = {
    login: string
    id: number
}


export const GitTest: React.FC = () => {

    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
    const [searchTerm, setSearchTerm] = useState('Glotov')

    useEffect( () => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    return (
        <div className={s.container}>
            <div className={s.leftSide}>
                <GitInput 
                    value={searchTerm}
                    onSubmit={(value:string) => {setSearchTerm(value)}}
                />
                <h4>Click on Login for more info</h4>
                <GitList
                    searchTerm={searchTerm}
                    onUserSelect={setSelectedUser}
                    selectedUser={selectedUser}
                />
            </div>
            <GitDetail selectedUser={selectedUser} />
        </div>
    )
}