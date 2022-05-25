import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './navigation.css'
import logoutIcon from '../../resources/img/logout.svg'

import {pagesUpdate, currentPageUpdate, studentsClear, addUpdate} from '../studentsList/studentsSlice'

const Navigation = () => {

    const [currentPages, setCurrentPages] = useState(5)

    const {students, pages, currentPage, access} = useSelector(state => state.students)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        
        if (!access) return

        updatePages(1)
        dispatch(currentPageUpdate(1))
    }, [students.length])

    const updatePages = (pageStart) => {
        let countPages = Math.floor(students.length / 5)
        if ((students.length / 5) > countPages) countPages++
        const newArr = []
        for (let i = pageStart; i <= countPages; i++) {
            newArr.push(i)
        }

        setCurrentPages(pageStart + 4)
        dispatch(pagesUpdate(newArr))
    }

    const onClick = (num) => {
        dispatch(currentPageUpdate(num))
    }

    const onClickNext = () => {
        updatePages(currentPages + 1)
        dispatch(currentPageUpdate(currentPages + 1))
    }

    const onClickPrev = () => {
        updatePages(currentPages - 9)
        dispatch(currentPageUpdate(currentPages - 5))
    }

    const onClickLogout = () => {
        dispatch(studentsClear([]))
        dispatch(currentPageUpdate(0))
        dispatch(pagesUpdate([]))
        localStorage.removeItem('userData')
        history.push('/')
    }

    const onClickAdd = () => {
        dispatch(addUpdate(true))
    }

    if (!access) return(null)

    const newPages = pages.map((item, index) => {
        if (index > 4) return null
        let className = 'students_nav_active' 

        if (item === currentPage) {
            className = className + ' active'
        }

        return (
            <div>
                <div className="students_nav_page"
                     onClick={() => {onClick(item)}}>
                    {item}
                </div>
                <div className={className}></div>
            </div>
        )
    })

    let navNext = null
    if (pages.length > 5) {
        navNext = <div>
                    <div className="students_nav_page"
                         onClick={() => {onClickNext()}}>Next >></div>
                    <div className="students_nav_active"></div>
                </div>
    }

    let navPrev = null
    if (currentPages > 5) {
        navPrev = <div>
                    <div className="students_nav_page"
                         onClick={() => {onClickPrev()}}>{'<< Prev'}</div>
                </div>
    }

    return (
        <>
            <div className="students_nav">
                {navPrev}
                {newPages}
                {navNext}
            </div>
            <div>
                <button className="add_btn"
                        onClick={onClickAdd}>Add a student</button>
            </div>
            <div className="students_logout">
                <img src={logoutIcon} alt="logout"/>
                <div className="logout"
                     onClick={() => {onClickLogout()}}>Log Out</div>
            </div>
        </>
    )
}

export default Navigation