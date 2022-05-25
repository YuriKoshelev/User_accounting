import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    students: [],
    pages: [],
    currentPage: 0, 
    errorLoading: false,
    loading: false,
    access: false,
    add: false,
    editId: '',
    token: ''
}

const clientsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        studentsUpdate: (state, action) => {
            state.students = action.payload
        },
        addStudent: (state, action) => {
            state.students = [...action.payload, ...state.students]
        },
        studentsClear: (state) => {
            state.students = []
        },
        currentPageUpdate: (state, action) => {
            state.currentPage = action.payload
        },
        pagesUpdate: (state, action) => {
            state.pages = action.payload
        },
        loadStudentEdit: (state, action) => {
            state.students = action.payload
        },
        accessUpdate: (state, action) => {
            state.access = action.payload
        },
        loadingUpdate: (state, action) => {
            state.loading = action.payload
        },
        editStudentUpdate: (state, action) => {
            state.editId = action.payload
        },
        addUpdate: (state, action) => {
            state.add = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
});

const {actions, reducer} = clientsSlice;

export default reducer;

export const {
    studentsUpdate,
    studentsClear,
    addStudent,
    pagesUpdate,
    currentPageUpdate,
    loadStudentEdit,
    accessUpdate,
    loadingUpdate,
    editStudentUpdate,
    addUpdate,
    setToken
} = actions;