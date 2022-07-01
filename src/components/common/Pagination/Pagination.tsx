import React, {useState} from 'react';
import s from './Pagination.module.scss'

type Props = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

let Pagination: React.FC<Props> = ({
    totalUsersCount,
    pageSize,
    currentPage,
    onPageChanged,
    portionSize = 5}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(totalUsersCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    const setLeftPageNumber = () => {
        setPortionNumber(portionNumber - 1);
        onPageChanged((portionNumber - 2) * portionSize + 1);
    }
    const setRightPageNumber = () => {
        setPortionNumber(portionNumber + 1);
        onPageChanged(portionNumber * portionSize + 1);
    }

    return (
        <div className={s.pagination}>
            { portionNumber > 1 && 
            <a className={s.leftArrow} onClick={() => {setLeftPageNumber()}}></a>}

            { 
                pages.filter ( (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p, index) =>  {
                    return <a key={index} className={currentPage === p ? s.selected : ""} 
                    onClick={ () => onPageChanged(p)}>{p}</a>
                })
            }

            { portionCount > portionNumber &&
            <a className={s.rightArrow} onClick={() => {setRightPageNumber()}}></a>}
        </div>

    )
}

export default Pagination;