import React from "react"
import StudentsList from "../studentsList/StudentsList"
import Navigation from "../navigation/Navigation"
import AddEditStudent from "../addEditStudent/AddEditStudent"
import UserProfile from "../userProfile/UserProfile"
import StyledStudentsList from "../style/StyleStudentsList"
import StyledOverlay from "../style/StyleOverlay"



const Main = () => {
    return (
        <StyledStudentsList>
            <section class="students">
                    <StudentsList/>
                    <Navigation/>
            </section>
            <StyledOverlay>
                <AddEditStudent/>
                <UserProfile/>
            </StyledOverlay>
        </StyledStudentsList>
    )
}

export default Main