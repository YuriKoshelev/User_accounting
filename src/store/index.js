import { configureStore } from '@reduxjs/toolkit'
import students from '../components/studentsList/studentsSlice'

const store = configureStore({
    reducer: {students},
    devTools: process.env.NODE_ENV !== 'production'
})

export default store