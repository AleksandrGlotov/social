import s from './GitTest.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';

type SearchPropstype = {
    value: string
    onSubmit: (fixValue: string) => void
}

export const GitInput: React.FC<SearchPropstype> = (props) => {

    const [tempSeacrh, setTempSearch] = useState('')

    useEffect(() => {
        setTempSearch(props.value)
    },[props.value])

    return (
        <div className={s.gitSearch}>
                <input
                    className={s.inputSearch}
                    placeholder="search"
                    value={tempSeacrh}
                    onChange={(e) => {
                        setTempSearch(e.currentTarget.value)
                    }}
                />
                <button
                    className={s.buttonSeacrh}
                    onClick={ () => {
                        props.onSubmit(tempSeacrh)
                    }} >
                    find
                </button>
                <button
                    className={s.buttonReset}
                    onClick={() => props.onSubmit('Glotov')}>
                        Reset
                </button>

        </div>
    )
}