import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

export const signUp = async credentials => {
    return await axios.post(baseUrl, credentials)
}