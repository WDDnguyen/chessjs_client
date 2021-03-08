import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

export const signUp = async credentials => {
    console.log('SEND TO SERVER : ', credentials)
    const response = await axios.post(baseUrl, credentials)
    console.log('RECEIVED', response)
    return response.data
}