import styled from 'styled-components'


const StyledAddEdit = styled.div`
    
    .modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 315px;
        min-height: 181px;
        background-color: #f2f2f2;
        padding: 38px 40px 40px 40px;
        border-radius: 20px;
        &__band {
            height: 30px;
            background-color: #e18c46;
            border-radius: 20px;
            margin-top: 10px
        }
        &__subtitle {
            color: #0d0d0d;
            font-size: 18px;
            font-weight: 700;
            text-align: center;
        }
    }

    .form_edit {
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 88%;
        justify-content: space-evenly;
        input {
            width: 250px;
            height: 20px;
            padding-left: 10px;
        }
    } 

    .edit_buttons {
        display: flex;
        width: 100%;
        justify-content: space-around;
        margin-top: 10px;
    }

    .edit_button_cancel, .edit_button_submit {
        margin-top: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        border-radius: 20px;
        border-color:rgb(208, 208, 208);
        border-style: none;
        background-color:#e17c29;
        color: white;
        height: 25px;
        width: 100px;
        &:hover {
            background-color:#cb6919;
        }
    }

    .error_form {
        height: 10px;
        font-size: 12px;
        color: red;
    }
`


export default StyledAddEdit