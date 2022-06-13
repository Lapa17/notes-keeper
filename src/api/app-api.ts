import axios from 'axios'
import {ReactNode} from "react";

const instance = axios.create({
    baseURL: 'http://localhost:3001/notes',
    withCredentials: true,
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
})

// api
export const notesAPI = {
    getNotes(tag:ReactNode | null) {
        return instance.get(tag ?`?tags_like=${tag}`: '');
    },
    addNote(payload:{id:string, title:string, description:string, tags:Array<string>}){
        return instance.post('', {
            id:payload.id,
            title:payload.title,
            description:payload.description,
            tags:payload.tags})
    },
    deleteNote(id:string) {
        return instance.delete(`/${id}`);
    },
    updateNote(payload:{id:string, title:string, description:string, tags:Array<string>}) {
        debugger
        return instance.put(`/${payload.id}`, {
            id:payload.id,
            title:payload.title,
            description:payload.description,
            tags:payload.tags})
    },
}

