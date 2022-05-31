import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Spinner from '../spinner/Spinnner'
import useStudentsService from '../../services/StudentsService'

import './studentsList.scss'
import checkIcon from '../../resources/img/check.webp'
import btn_delete from '../../resources/img/delete.svg'

import {studentsUpdate, 
        editStudentUpdate, 
        pagesUpdate, 
        setShowUserProfile, 
        currentPageUpdate,
        currentServerPagesUpdate,
        setLastPage,
        loadingUpdate} from './studentsSlice'

const StudentsList = () => {

    const [filter, setFilter] = useState('')

    const {students, currentPage, access, token, user, loading} = useSelector(state => state.students)
    const dispatch = useDispatch()
    const history = useHistory()
    const {getStudents, deleteStudent, sort} = useStudentsService()

    useEffect(() => {
        
        if (!access) return
        
        dispatch(loadingUpdate(true))

        getStudents(token)
        .then((res) => {
            dispatch(studentsUpdate(res.data.student_list.data))

            const pages = res.data.student_list.last_page
            const newArr = []
            for (let i = 1; i <= pages * 3; i++) {
                newArr.push(i)
            }

            if (res.data.student_list.data.length < 10) newArr.pop()
            if (res.data.student_list.data.length < 5) newArr.pop()

            dispatch(pagesUpdate(newArr))
            dispatch(setLastPage(pages))
        })
        .finally(() => {
           dispatch(loadingUpdate(false))
        })

    }, [])

    if (!access) {
        history.push('/')
    }

    const onClickEmail = (id) => {
        dispatch(editStudentUpdate(id))
    }

    const onClickUser = (event) => {
        dispatch(setShowUserProfile(true))
    }

    const onChangeFilter = (event) => {
        setFilter(event.target.value)
    }

    const onClickDelete = (id) => {
        deleteStudent(id, token)
            .then(() => {
                const newStudents = JSON.parse(JSON.stringify(students))
                const newArr = newStudents.filter((item) => {
                    if (item.id === id) return false
                    return true
                })
                dispatch(studentsUpdate(newArr))
            })
    }

    const onChangeSort = (event) => {
        
        let studentsSort = []
        if (event.target.value) {
            studentsSort = sort(event.target.value, students)
        } else {
            studentsSort = sort('id', students)
        }
        dispatch(studentsUpdate(studentsSort))
    }

    let filterStudents = students
    if (filter) {
        dispatch(currentPageUpdate(1))
        dispatch(currentServerPagesUpdate(1))
        filterStudents = students.filter((item) => {
            if (item.first_name.toLowerCase().includes(filter.toLowerCase())) return true
            if (item.last_name.toLowerCase().includes(filter.toLowerCase())) return true
        }) 
    }

    const arrStudents = filterStudents.map((item, index) => {
        const startInd = currentPage * 5 - 5
        const endInd = currentPage * 5 - 1
        if (index >= startInd && index <= endInd) {
            return (
                <li key={item.id}>
                    <div className="students_item faded">
                        <div className="item_img">
                            <img src={checkIcon} alt="check"/>
                        </div>
                        <div className="item_inform">
                            <div className="item_email"
                                 onClick={() => {onClickEmail(item.id)}}>
                                     {item.email}</div>
                            <div className="item_name">{`${item.first_name} ${item.last_name}`}</div>
                        </div>
                        <div className="item_groups">
                            <div className="item_id_group">{item.study_group_id ? item.study_group_id : '...'}</div>
                            <div className="item_name_grouo">{item.study_group.title ? item.study_group.title : 'Default group'}</div>
                        </div>
                        <div className='delete'
                             onClick={() => {onClickDelete(item.id)}}>
                            <img src={btn_delete} alt="delete" />
                        </div>
                    </div>
                </li>
            )
        }
    })

    return (
        <>
            <div className="students_wraper">
                <div className="students_heading">User List</div>
                <div className='user_info'
                     onClick={onClickUser}>
                         {user}
                </div>
            </div>
            <div className="students_line">
                <div className='students_tools'>
                    <input name="filter"  
                           placeholder="Filter by name" 
                           type="text"
                           value={filter}
                           onChange={onChangeFilter}/>
                </div>
                <select className='students_tools_sort'
                            onChange={onChangeSort}>
                    <option value='' selected>Sort by default</option>
                    <option value='first_name'>Sort by first name</option>
                    <option value='last_name'>Sort by last name</option>
                    <option value='email'>Sort by email</option>
                    <option value='study_group_id'>Sort by group ID</option>
                </select>
            </div>
            <div className="students_list">
                <ul>
                    {
                        loading ? <Spinner/> : arrStudents
                    }
                </ul>
            </div>
        </>
        
    )
}

export default StudentsList