import {NoteForm} from "./NoteForm/NoteForm";
import {Note} from "./Note/Note";
import {deleteNoteTC, initializeAppTC} from "../../state/reducer";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {useEffect} from "react";

export type NoteType = {
    id: string
    title: string
    description: string
    tags:string[]
}


export const Notes = () => {

    const state = useAppSelector(state => state.app)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(initializeAppTC())
    },[])

    const resetFilterHelper = () => {
        dispatch(initializeAppTC())
    }

    return (
        <div >
            <h1>Notes</h1>
            <button onClick={resetFilterHelper}>Reset filter</button>
            <NoteForm notes={state} />
            <div className="notes--container">
            {state && state.map((el) => <Note key={el.id} note={el} />)}
            </div>
        </div>
    )
}