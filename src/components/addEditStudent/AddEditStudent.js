import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './addEditStudent.css'

import {studentsUpdate, editStudentUpdate, addUpdate, addStudent} from '../studentsList/studentsSlice'

const AddEditStudent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [groupId, setGroupID] = useState('')


    const {students, editId, add} = useSelector(state => state.students)
    const dispatch = useDispatch()

    useEffect(() => {
        
        setFirstName('')
        setLastName('')
        setEmail('')
        setGroupID('')

        for (let item of students) {
            if (item.id === editId) {
                setFirstName(item.first_name)
                setLastName(item.last_name)
                setEmail(item.email)
                setGroupID(item.study_group_id)
            }
        }
    }, [editId])

    const onChangeFirstName = (event) => {
        setFirstName(event.target.value)
    }

    const onChangeLastName = (event) => {
        setLastName(event.target.value)
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const onChangeGroupId = (event) => {
        setGroupID(event.target.value)
    }

    const onClickSave = (event) => {
        event.preventDefault()
        
        if (editId) {
            const newStudents = JSON.parse(JSON.stringify(students))
            const newArr = newStudents.map((item) => {
                if (editId === item.id) {
                    item.first_name = firstName
                    item.last_name = lastName
                    item.email = email
                    item.study_group_id = groupId
                }
                return item;
            })
            dispatch(studentsUpdate(newArr))
            dispatch(editStudentUpdate(''))
        } else {
            const newStudent = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                study_group_id: groupId
            }
            dispatch(addStudent([newStudent]))
            dispatch(addUpdate(false))
        }
    }

    const onClickCancel = (event) => {
        event.preventDefault()
        if (editId) dispatch(editStudentUpdate(''))
        else dispatch(addUpdate(false))
    }

    if (!editId && !add) return(null)

    return (
        <div className="overlay faded">
            <div className="modal" id="consultation">
                <div className="modal__subtitle">{add? 'Add a student' : 'Editing a student'}</div>
                <div className="modal__band"></div>
                <form className="form_edit" action="#">                
                    <input name="first_name" required 
                           placeholder="First name" 
                           type="text"
                           value={firstName}
                           onChange={onChangeFirstName}/>
                    <input name="last_name" required 
                           placeholder="Last name" 
                           type="text"
                           value={lastName}
                           onChange={onChangeLastName}/>
                    <input name="email" required 
                           placeholder="E-mail" 
                           type="email"
                           value={email}
                           onChange={onChangeEmail}/>
                    <input name="group_id" 
                           placeholder="Group id" 
                           type="text"
                           value={groupId}
                           onChange={onChangeGroupId}/>
                    <div className="edit_buttons">
                        <button className="edit_button_cancel"
                                onClick={onClickCancel}>
                                Cancel</button>
                        <button className="edit_button_submit"
                                onClick={onClickSave}>
                                {add? 'Add' : 'Save'}
                                </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEditStudent