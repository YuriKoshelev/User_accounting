import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useStudentsService from '../../services/StudentsService';

import './studentsList.css'
import checkIcon from '../../resources/img/check.webp'

import {studentsUpdate, editStudentUpdate} from './studentsSlice'

const StudentsList = () => {

    const {students, currentPage, access, token} = useSelector(state => state.students)
    const dispatch = useDispatch()
    const history = useHistory()
    const {getStudents} = useStudentsService()

    useEffect(() => {
        
        if (!access) return

        getStudents(token)
        .then((res) => {
            console.log(res)
        })

        //Создаем фейковые данные*********************
        if (students.length === 0) {
            let i = 0
            const newArr = []
            while (i <= 62) {
                i++
                const student = {
                    id: String(i),
                    study_group_id: '',
                    email: `email${i}@list.ru`,
                    first_name: `Name${i}`,
                    last_name: `LastName${i}` 
                }
                newArr.push(student)
            }
            dispatch(studentsUpdate(newArr))
        }
    }, [])

    if (!access) {
        history.push('/')
    }

    const onClickEmail = (id) => {
        dispatch(editStudentUpdate(id))
    }

    const arrStudents = students.map((item, index) => {
        const startInd = currentPage * 5 - 5
        const endInd = currentPage * 5 - 1
        if (index >= startInd && index <= endInd) {
            return (
                <li key={item.id}>
                    <div className="students_item">
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
                            <div className="item_name_grouo">Default group</div>
                        </div>
                    </div>
                </li>
            )
        }
    })

    return (
        <>
            <div className="students_heading">User List</div>
            <div className="students_line"></div>
            <div className="students_list">
                <ul>
                    {
                        arrStudents
                    }
                </ul>
            </div>
        </>
        
    )
}

export default StudentsList