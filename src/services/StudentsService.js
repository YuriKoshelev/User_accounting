import {useHttp} from '../hooks/http.hooks'

const useStudentsService = () => {
    const request = useHttp()

    const _apiBase = 'https://api.clubstation.io'
    
    const getHeaders= (token = null) => {
        const headers = {
            'Content-Type': 'application/json',
            email: 'dementor@egggis.ru',
            password: 'testpassword1',
            token: ''
        } 

        if (token) headers.token = token

        return headers
        
    }

    const checkAccess = async (body) => {

        const res = await request(`${_apiBase}/api/v1/auth/signin`, "POST", body, getHeaders());
        return res

    }

    const getStudents = async (token) => {

        const res = await request(`${_apiBase}/api/v1/app/students`, "GET", null, getHeaders(token));
        return res
    }

    const addStudent = async (body, token) => {
        
        const res = await request(`${_apiBase}/api/v1/app/students`, "POST", body, getHeaders(token));
        return res
    }

    const editStudent = async (body, id, token) => {
        
        const res = await request(`${_apiBase}/api/v1/app/students/${id}`, "PUT", body, getHeaders(token));
        return res
    }

    return {checkAccess, getStudents, addStudent, editStudent}
}

export default useStudentsService;