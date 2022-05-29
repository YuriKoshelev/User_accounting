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

    return {checkAccess, getStudents, addStudentRequest, editStudent, deleteStudent, getProfileUser}
}

export default useStudentsService;