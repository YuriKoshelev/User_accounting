import {useHttp} from '../hooks/http.hooks'

const useStudentsService = () => {
    const request = useHttp()

    const _apiBase = 'https://api.clubstation.io'
    
    const getHeaders= (token = null) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        } 

        return headers
        
    }

    const checkAccess = async (body) => {

        const res = await request(`${_apiBase}/api/v1/auth/signin`, "POST", body, getHeaders());
        return res

    }

    const getStudents = async (token, page = 1) => {

        const res = await request(`${_apiBase}/api/v1/app/students?page=${page}`, "GET", null, getHeaders(token));
        return res
    }

    const addStudentRequest = async (body, token) => {
        
        const res = await request(`${_apiBase}/api/v1/app/students`, "POST", body, getHeaders(token));
        return res
    }

    const editStudent = async (body, id, token) => {
        
        const res = await request(`${_apiBase}/api/v1/app/students/${id}`, "PUT", body, getHeaders(token));
        return res
    }

    const deleteStudent = async (id, token) => {
        
        const res = await request(`${_apiBase}/api/v1/app/students/${id}`, "DELETE", null, getHeaders(token));
        return res
    }

    const getProfileUser = async (token) => {

        const res = await request(`${_apiBase}/api/v1/app/profile`, "GET", null, getHeaders(token));
        return res
    }

    const sort = (field, students) => {
        const studentsSort = JSON.parse(JSON.stringify(students))
        studentsSort.sort((a, b) => {
            if (a[field] > b[field]) return 1
            if (a[field] < b[field]) return -1
            return 0
        })
        return(studentsSort)
    }
    return {checkAccess, getStudents, addStudentRequest, editStudent, deleteStudent, getProfileUser, sort}
}

export default useStudentsService;