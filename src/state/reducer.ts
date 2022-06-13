import {NoteType} from "../components/Notes/Notes";
import {v1} from "uuid";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {notesAPI} from "../api/app-api";
import {ReactNode} from "react";



export type ActionType = {
    type: string
    payload: any
}

export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch, rejectWithValue}) => {
    const res = await notesAPI.getNotes(null)
    return res.data
})

export const filterNoteTC = createAsyncThunk('app/filterNote', async (param:{tag:ReactNode}, {dispatch, rejectWithValue}) => {
    const res = await notesAPI.getNotes(param.tag)
    return res.data
})

export const deleteNoteTC = createAsyncThunk('app/deleteNote', async (param:{ id: string }, {dispatch, rejectWithValue}) => {
    const res = await notesAPI.deleteNote(param.id)
    return {id:param.id}
})

export const deleteTagTC = createAsyncThunk('app/deleteTag', async (
    param:{ note: NoteType, tag: string }, {dispatch, rejectWithValue, getState}) => {
    const res = await notesAPI.updateNote({
        id: param.note.id,
        title: param.note.title,
        description: param.note.description,
        tags: param.note.tags.filter(el => el !== param.tag)
    })
    return dispatch(initializeAppTC())
})

export const saveNoteTC = createAsyncThunk('app/saveNote', async (
    param:{ id: string, title:string, description:string, tags:Array<string> }, {dispatch, rejectWithValue, getState}) => {
    const res = await notesAPI.updateNote({
        id: param.id,
        title: param.title,
        description: param.description,
        tags: param.tags
    })
    return dispatch(initializeAppTC())
})
export const addNoteTC = createAsyncThunk('app/addNote', async (
    param:{ id: string, title:string, description:string, tags:Array<string>}, {dispatch, rejectWithValue}) => {
    const res = await notesAPI.addNote({id: param.id, title: param.title, description: param.description, tags:param.tags} )
    return dispatch(initializeAppTC())
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
        builder.addCase(filterNoteTC.fulfilled, (state, action) => {
                const newState = [...action.payload]
                return state = newState
            })
        builder.addCase(deleteNoteTC.fulfilled, (state, action) => {
                return state.filter(el => el.id !== action.payload.id)
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