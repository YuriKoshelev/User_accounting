import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import useStudentsService from '../../services/StudentsService'
import './userProfile.scss'

import {setShowUserProfile} from '../studentsList/studentsSlice'

const UserProfile = () => {
    
    const [date, setDate] = useState({})

    const {token, user, showUserProfile} = useSelector(state => state.students)
    const {getProfileUser} = useStudentsService()
    const dispatch = useDispatch()

    useEffect(() => {
        getProfileUser(token)
            .then((res) => {
                setDate(res.data.user)
            })
    }, []) 

    if (!showUserProfile) return null
    
    const onClickClose = (event) => {
        event.preventDefault()
        dispatch(setShowUserProfile(false))
    }

    return (
        <div className="overlay faded">
            <div className="modal_user">
                <div className="modal_user_title">User profile</div>
                <div className="modal_user_date">{`Email: ${date.email}`}</div>
                <div className="modal_user_date">{`First name: ${date.first_name}`}</div>
                <div className="modal_user_date">{`Last name: ${date.last_name}`}</div>
                <div className="modal_user_date">{`Full name: ${date.fl_name}`}</div>
                <div className="modal_user_date">{`Sex: ${date.sex}`}</div>
                <div className="modal_user_date">{`Phone: ${date.phone}`}</div>
                <div className="modal_user_date">{`Role: ${date.role}`}</div>
                <button className="modal_user_btn"
                        onClick={onClickClose}>
                            Close
                </button>
            </div>
        </div>
    )
}

export default UserProfile