import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

export const signUp = async credentials => {
    return await axios.post(baseUrl, credentials)
}

export const signIn = async credentials => {
    return await axios.get(baseUrl, {params: {credentials}})
}