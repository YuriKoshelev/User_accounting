import styled from "styled-components"

const StyledNavigation = styled.section`
    .students_nav {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        height: 20px;
        &_page {
            margin: 3px 3px 0 3px;
            cursor: pointer;
            color: transparent;
            font-size: 18px;
            text-shadow: 0 0 0 black;
            &.next:hover {
                transform: translateX(3px);
            }
            &.prev:hover {
                transform: translateX(-3px);
            }
        }
        &_active {
            width: 100%;
            height: 3px;
            &.active {
                background-color: #e18c46;
            }
        }
    }

    .students_logout {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        background-color:rgba(0, 0, 0, .05);
        border-radius: 20px;
        img {
            display: block;
            height: 15px;
            width: 15px;
        }
    } 

    .logout {
        margin-left: 5px;
        cursor: pointer;
        &:hover {
            font-weight: 600;
        }
    }

    .add_btn {
        display: block;
        margin: 0 auto;
        margin-top: 25px;
        border-radius: 20px;
        border-style: none;
        background-color: #e18c46;
        cursor: pointer;
        height: 30px;
        width: 150px;
        font-size: 15px;
        color: transparent;
        text-shadow: 0 0 0 white;
        &:hover {
            background-color: #d6711f;
        }
    }
`

export default StyledNavigation