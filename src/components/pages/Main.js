import React from "react"
import StudentsList from "../studentsList/StudentsList"
import Navigation from "../navigation/Navigation"
import AddEditStudent from "../addEditStudent/AddEditStudent"
import UserProfile from "../userProfile/UserProfile"


const Main = () => {

    return (
        <>
            <section class="students">
                    <StudentsList/>
                    <Navigation/>
            </section>
            <AddEditStudent/>
            <UserProfile/>
        </>
    )
}

export default Main