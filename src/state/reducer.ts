import {NoteType} from "../components/Notes/Notes";
import {v1} from "uuid";



export type ActionType = {
    type: string
    payload: any
}

export default function (state:Array<NoteType>, action:ActionType){
    switch (action.type){
        case 'Add':{
            const newNote = {id: v1(),
                noteTitle:action.payload.noteTitle,
                noteDescription: action.payload.noteDescription,
                tags:action.payload.tags}
            const newState = [...state,newNote]
            localStorage.setItem('notes',JSON.stringify(newState))
            return newState
        }
        case 'Delete':{
            const filteredNotes = state.filter(el => el.id !== action.payload)
            localStorage.setItem('notes',JSON.stringify(filteredNotes))
            return filteredNotes
        }
        case 'FilteredByTag':{
            return state.filter(el => {
                return el.tags.find(tg => tg === action.payload.value) ? el : ''})
        }
        case 'ResetFilter':{
            return [...action.payload.state]
        }
        default: return state
    }
}