import styled from "styled-components"

const StyledStudentsList = styled.section`
    .students {
        width: 1000px;
        margin: 0 auto;
        margin-top: 20px;
        &_wraper {
            display: flex;
            align-items: center;
            .user_info {
                cursor: pointer;
                color: transparent;
                text-shadow: 0 0 0 black;
                &:hover {
                    font-weight: 600;
                }
            }
        }
        &_heading {
            text-align: center;
            font-size: 36px;
            font-weight: 600;
            width: 70%;
            margin-left: 14%;
        }
        &_line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            background-color: #e18c46;
            border-radius: 20px;
            margin-top: 10px;
            input {
                margin: 0 0 0 10px;
                padding-left: 10px;
                height: 20px;
            }
        }
        &_tools_sort {
            height: 26px;
            margin-right: 10px;
            width: 179px;
            margin-left: 10px;
            border-radius: 20px;
            outline: none;
            color: rgba(0, 0, 0, .5);
            padding-left: 5px;
        }
        ul {
            padding: 0 30px 0 0;
            li {
                list-style-type: none;
            }
        }
        &_item {
            display: grid;
            margin: 0 auto;
            margin-top: 15px;
            grid-template-columns: 12% 50% 35% 3%;
            gap: 10px;
            .item_img img {
                display: block;
                height: 20px;
                width: 20px;
                margin-left: 70%;
            }
            .item_name {
                margin-top: 5px;
                color:rgba(0, 0, 0, .6);
            }
            .item_email {
                cursor: pointer;
                color: transparent;
                text-shadow: 0 0 0 black;
                &:hover {
                    font-weight: 600;
                }
            }
            .item_id_group {
                font-weight: 600;
                line-height: 50%;
            }
            .item_name_grouo {
                margin-top: 10px;
                color:rgba(0, 0, 0, .6);
            }
            .delete {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 30px;
                width: 30px;
                border-radius: 90px;
                &:hover {
                    background-color: #f1bf96;
                }
                img {
                    display: block;
                    height: 20px;
                    width: 20px;
                    cursor: pointer;
                    color: transparent;
                    text-shadow: 0 0 0;
                }   
            }
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

    .spinner {
        display: flex;
        align-items: center;
        height: 275px;
    }

    .faded{
        animation-name: faded;
        animation-duration: 1.5s;
    }
    
    @keyframes faded{
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }
`

export default StyledStudentsList