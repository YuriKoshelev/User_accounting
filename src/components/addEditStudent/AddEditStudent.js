import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import useStudentsService from '../../services/StudentsService'
import './addEditStudent.scss'

import {studentsUpdate, editStudentUpdate, addUpdate, addStudents} from '../studentsList/studentsSlice'

const AddEditStudent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [groupId, setGroupID] = useState('')
    const [error_feilds, setError_feilds] = useState('')


    const {students, editId, add, token} = useSelector(state => state.students)
    const dispatch = useDispatch()
    const {editStudent, addStudentRequest} = useStudentsService()

    const formatEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    useEffect(() => {
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
        setError_feilds('')
    }

    const onChangeLastName = (event) => {
        setLastName(event.target.value)
        setError_feilds('')
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
        setError_feilds('')
    }

    const onChangeGroupId = (event) => {
        setGroupID(event.target.value)
        setError_feilds('')
    }

    const clearFields = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setGroupID('')
        setError_feilds('')
    }

    const onClickSave = (event) => {
        event.preventDefault()
        
        if (error_firstname || error_lastname || error_email) return

        if (!firstName || !lastName || !email) {
            setError_feilds('Some fields are not filled in')
            return
        }

        clearFields()

        if (editId) {
            const newStudents = JSON.parse(JSON.stringify(students))
            let editItem = {}
            let newArr = newStudents.map((item) => {
                if (editId === item.id) {
                    item.first_name = firstName
                    item.last_name = lastName
                    item.email = email
                    item.study_group_id = groupId
                    editItem = item
                }
                return item;
            })

            editStudent(editItem, editId, token)
                .then((res) => {
                    newArr = newArr.map((item) => {
                        if (editId === item.id) {
                            return res.data.student
                        }
                        return item;
                    })
                    dispatch(studentsUpdate(newArr))
                    dispatch(editStudentUpdate(''))
                })
                .catch(() => {
                    setError_feilds('An error has occurred, please try again later')
                })
        } else {
            const newStudent = {
                id: uuidv4(),
                first_name: firstName,
                last_name: lastName,
                email: email,
                study_group_id: groupId,
                study_group: {
                    title: ''
                }
            }

            addStudentRequest(newStudent, token)
                .then((res) => {
                    console.log('add', res)
                    const newStudent = res.data.student
                    newStudent.study_group = {
                        title: ''
                    }
                    dispatch(addStudents([newStudent]))
                    dispatch(addUpdate(false))
                })
            
        }
    }

    const onClickCancel = (event) => {
        event.preventDefault()
        if (editId) dispatch(editStudentUpdate(''))
        else dispatch(addUpdate(false))
        clearFields()
    }

    if (!editId && !add) return(null)

    let error_firstname = null
    if (firstName && firstName.length < 3) error_firstname = 'Min of 3 characters'

    let error_lastname = null
    if (lastName && lastName.length < 3) error_lastname = 'Min of 3 characters'

    let error_email = null
    if (email && !formatEmail.test(email)) error_email = 'Invalid format'

    return (
        <div className="overlay faded">
            <div className="modal">
                <div className="modal__subtitle">{add? 'Add a student' : 'Editing a student'}</div>
                <div className="modal__band"></div>
                <form className="form_edit" action="#">                
                    <input name="first_name" required 
                           placeholder="First name" 
                           type="text"
                           value={firstName}
                           onChange={onChangeFirstName}/>
                    <div className='error_form'>{error_firstname}</div>
                    <input name="last_name" required 
                           placeholder="Last name" 
                           type="text"
                           value={lastName}
                           onChange={onChangeLastName}/>
                    <div className='error_form'>{error_lastname}</div>
                    <input name="email" required 
                           placeholder="E-mail" 
                           type="email"
                           value={email}
                           onChange={onChangeEmail}/>
                    <div className='error_form'>{error_email}</div>       
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
                    <div className='error_form'>{error_feilds}</div>
                </form>
            </div>
        </div>
    )
}

export default AddEditStudent