import {useCallback} from 'react'
import axios from 'axios'

export const useHttp = () => {

    const request= useCallback(async (url, 
                                      method = 'GET', 
                                      body = null, 
                                      headers = {'Content-Type': 'application/json'}) => {

        try {

            const response = axios({
                                method: method,
                                url: url,
                                data: body,
                                headers: headers
                            });
            
            //console.log('response', response)

            const data = response

            return data

        } catch(e) {
            throw e
        }

    }, [])

    return request
}