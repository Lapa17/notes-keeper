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
    getNotes(tag:string | null) {
        return instance.get(tag ?`?tags_like=${tag}`: '');
    },
    addNote(id:string, title:string, description:string, tags:Array<string>){
        return instance.post('', {id, title, description, tags})
    },
    deleteNote(id:string) {
        return instance.delete(`/${id}`);
    },
}

