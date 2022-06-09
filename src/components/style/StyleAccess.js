import styled from "styled-components"
import userSvg from '../../resources/img/user.svg'
import paspasswordSvg from '../../resources/img/password.svg'

const StyledAccess = styled.section`
.access {
    margin: 0 auto;
    height: 400px;
    width: 330px;
    display: block;
    .logo {
        margin-top: 50%;
    }
    .heading_descr {
        margin-top: 20px;
    }
    .heading_sybdescr {
        font-size: 10px;    
    }
    .form_access {
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        #user {
            background: url(${userSvg}) no-repeat center left;
        }
        #password {
            background: url(${paspasswordSvg}) no-repeat center left;
        }
        #remember {
            height: 10px;
        }
    }
    .btn_login {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 30px;
        background-color:#e18c46;
        border-radius: 20px;
        height: 30px;
        color:white;
        cursor: pointer;
        &:hover {
            background-color:#da792b;
        }
        &_text {
            margin-right: 220px;
        }
        &_arrow {
            height: 20px;
            width: 20px;
            border: white solid;
            border-radius: 90px;
            border-width: 1px;
            span {
                display: block;
                height: 2px;
                width: 7px;
                margin-left: 7px;
                background-color: white;
                margin-bottom: 2px;
                transform: rotate(45deg);
                &:nth-child(1) {
                    margin-top: 6px;
                }
                &:nth-child(2) {
                    transform: rotate(-45deg);  
                }
            }
        } 

    }
    .error {
        margin: 0 auto;
        margin-top: 15px;
        color: red;
        font-weight: 600;
    }
}

input {
    margin-top: 15px;
    height: 30px;
    border-radius: 20px;
    border-color: rgb(180, 180, 180);
    border-width: 2px;
    border-style: solid;
    padding-left: 30px;
    outline: none;
}
`

export default StyledAccess