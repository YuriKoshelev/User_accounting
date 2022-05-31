import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useStudentsService from '../../services/StudentsService'
import './navigation.scss'
import logoutIcon from '../../resources/img/logout.svg'

import {pagesUpdate, 
        currentPageUpdate, 
        studentsClear, 
        addUpdate, 
        addStudents,
        currentServerPagesUpdate,
        setLastPage,
        loadingUpdate} from '../studentsList/studentsSlice'

const Navigation = () => {

    const [pagesLoaded, setPagesLoaded] = useState(1)

    const {students, 
           pages, 
           currentPage, 
           access, 
           currentServerPage, 
           token, 
           lastPage,
           loading} = useSelector(state => state.students)
    
    const dispatch = useDispatch()
    const history = useHistory()
    const {getStudents, sort} = useStudentsService()

    useEffect(() => {
        
        if (!access) return

        if (currentPage === 0 || currentPage === 1) {
            dispatch(currentPageUpdate(1))
        } else {
            if (pages.length < currentPage) dispatch(currentPageUpdate(currentPage - 1))
            else dispatch(currentPageUpdate(currentPage))  
        }
    }, [students.length, pages.length])

    const onClick = (num) => {
        dispatch(currentPageUpdate(num))
    }

    const onClickNext = () => {
        
        if (currentServerPage + 1 > pagesLoaded) {
            if (loading) return
            dispatch(loadingUpdate(true))
            getStudents(token, currentServerPage + 1)
            .then((res) => {
                dispatch(addStudents(res.data.student_list.data))
                setPagesLoaded(pagesLoaded + 1)

                const pages = res.data.student_list.last_page
                const newArr = []
                for (let i = 1; i <= pages * 3; i++) {
                    newArr.push(i)
                }

                if (res.data.student_list.data.length < 10) newArr.pop()
                if (res.data.student_list.data.length < 5) newArr.pop()

                dispatch(pagesUpdate(newArr))
                dispatch(currentPageUpdate((currentServerPage + 1) * 3 - 2))
                dispatch(currentServerPagesUpdate(currentServerPage + 1))
                dispatch(setLastPage(pages))  
            })
            .finally(() => {
                dispatch(loadingUpdate(false))
            })
        } else {    
            dispatch(currentPageUpdate((currentServerPage + 1) * 3 - 2))
            dispatch(currentServerPagesUpdate(currentServerPage + 1))
        }

    }

    const onClickPrev = () => {
        dispatch(currentServerPagesUpdate(currentServerPage - 1))
        dispatch(currentPageUpdate(currentServerPage * 3 - 3))
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
        if (index > currentServerPage * 3 - 1) return null
        if (index < currentServerPage * 3 - 3) return null

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
    if (pages.length > 3 && lastPage > currentServerPage) {
        navNext = <div>
                    <div className="students_nav_page next"
                         onClick={() => {onClickNext()}}>{'Next >>'}</div>
                    <div className="students_nav_active"></div>
                </div>
    }

    let navPrev = null
    if (currentServerPage > 1) {
        navPrev = <div>
                    <div className="students_nav_page prev"
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