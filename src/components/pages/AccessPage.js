import React, {useState, useEffect} from "react"
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux"
import useStudentsService from '../../services/StudentsService';
import './accessPage.css'
import logo from '../../resources/img/Logo.svg'

import {accessUpdate, setToken} from '../studentsList/studentsSlice'

const AccessPage = () => {
    
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [error, setError] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()
    const {checkAccess} = useStudentsService()

    useEffect(() => {
        const dataStorage = localStorage.getItem('userData');
        if (dataStorage) {
            const data = JSON.parse(dataStorage)

            if (data.token) {
                dispatch(setToken(data.token))
                dispatch(accessUpdate(true))
                history.push('/main')
            }   
        } 

        setUser('dementor@egggis.ru')
        setPassword('testpassword1')
    }, [])

    const onLogin = (event) => {
        event.preventDefault()
        setError('')

        let bodyRequest = {
            email: user,
            password: password
        }

        const result = checkAccess(bodyRequest)

        result.then((res) => {
            
            if (remember) {
                localStorage.setItem('userData', JSON.stringify({ 
                    user: user,
                    token: res.data.token 
                }))
            }

            dispatch(setToken(res.data.token))
            dispatch(accessUpdate(true))
            history.push('/main')
        })
        .catch((res) => {
            console.log('catch: ', res.response.data.error)
            setError(res.response.data.error)
        })
        
    }

    const onChangeUser = (event) => {
        setUser(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const onClickCheckBox = (event) => {
        setRemember(event.target.checked)
    }



    return (
        <section className="access">
        
            <div className="logo">
                <img src={logo} alt="Logo"/>
            </div>
            
            <div className="heading_descr">Wecome to the Learning Management System</div>
            <div className="heading_sybdescr">Please log in to continue</div>

            <form className="form_access" action="#">
                <input id="user" 
                       name="user" 
                       required placeholder="User name" 
                       type="text"
                       value={user}
                       onChange={onChangeUser}/>
                <input id="password" 
                       name="password" 
                       required placeholder="Password" 
                       type="password"
                       value={password}
                       onChange={onChangePassword}/>
                <div>
                    <input type="checkbox" 
                           id="remember" 
                           name="remember"
                           onClick={onClickCheckBox}/>
                    <label for="remember">Remember me</label>
                </div>
            </form>

            <div className="btn_login"
                 onClick={onLogin}>
                <div className="btn_login_text">Log in</div>
                <div className="btn_login_arrow">
                    <span></span>
                    <span></span>
                </div>
            </div>
        
            <div className="error">{error}</div>
        </section>
    )
}

export default AccessPage