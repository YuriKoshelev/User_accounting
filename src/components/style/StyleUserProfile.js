import styled from 'styled-components'


const StyledUserProfile = styled.div`
    .modal_user {
        margin: 0 auto;
        margin-top: 6rem;
        min-height: 400px;
        width: 500px;
        background-color: #e18c46;
        color: white;
        border-radius: 20px;
        padding: 15px;
        border: solid;
        border-width: 2px;
        border-color: white;
        &_title {
            text-align: center;
            font-size: 30px;
            font-weight: 600;
            margin-bottom: 20px;
        }
        &_date {
            margin-top: 15px;
            font-size: 20px;
        }
        &_btn {
            display: block;
            margin: 0 auto;
            margin-top: 50px;
            border-radius: 20px;
            height: 30px;
            width: 150px;
            border-style: none;
            font-size: 20px;
            color: #c76718;
            cursor: pointer;
            &:hover {
                transform: translateY(-2px);
            }
        }

    }
`

export default StyledUserProfile