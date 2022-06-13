import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3001/notes',
    withCredentials: true,
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
})

// api
export const notesAPI = {
    getNotes() {
        return instance.get('');
    },
}

