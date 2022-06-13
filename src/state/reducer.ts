import {NoteType} from "../components/Notes/Notes";
import {v1} from "uuid";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {notesAPI} from "../api/app-api";



export type ActionType = {
    type: string
    payload: any
}
//
// export const appReducer = (state:Array<NoteType>, action:ActionType) => {
//     switch (action.type){
//         case 'Add':{
//             const newNote = {id: v1(),
//                 title:action.payload.noteTitle,
//                 description: action.payload.noteDescription,
//                 tags:action.payload.tags}
//             const newState = [...state,newNote]
//             localStorage.setItem('notes',JSON.stringify(newState))
//             return newState
//         }
//         case 'Delete':{
//             const filteredNotes = state.filter(el => el.id !== action.payload)
//             localStorage.setItem('notes',JSON.stringify(filteredNotes))
//             return filteredNotes
//         }
//         case 'FilteredByTag':{
//             return state.filter(el => {
//                 return el.tags.find(tg => tg === action.payload.value) ? el : ''})
//         }
//         case 'ResetFilter':{
//             return [...action.payload.state]
//         }
//         default: return state
//     }
// }


export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch, rejectWithValue}) => {
    const res = await notesAPI.getNotes(null)
    return res.data
})

const slice = createSlice({
    name: 'app',
    initialState: [] as Array<NoteType>,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(initializeAppTC.fulfilled, (state, action) => {
            const newState = [...action.payload]
            return state = newState
        })
    }
})

export const appReducer = slice.reducer

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export const {} = slice.actions