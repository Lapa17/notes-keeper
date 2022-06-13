import {NoteForm} from "./NoteForm/NoteForm";
import {Note} from "./Note/Note";
import {initializeAppTC} from "../../state/reducer";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {useEffect} from "react";

export type NoteType = {
    id: string
    noteTitle: string
    noteDescription: string
    tags:string[]
}


export const Notes = () => {

    const state = useAppSelector(state => state.app)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(initializeAppTC())
    },[state])

    const onDeleteClickHandler = (id:string) => {
        dispatch({type:'Delete', payload: id})
        // notesAPI.deleteNote('ax9R0Tj').then(res => {
        //     debugger
        // })
    }
    const resetFilterHelper = () => {
        dispatch(initializeAppTC())
        // dispatch({type:'ResetFilter', payload: {state:initialNotes}})
    }

    return (
        <div>
            <h1>Notes</h1>
            <button onClick={resetFilterHelper}>Reset filter</button>
            <NoteForm notes={state} dispatch={dispatch}/>
            {state && state.map((el) => <Note key={el.id}
                                              note={el}
                                              onDeleteClickHandler={onDeleteClickHandler}
                                              dispatch={dispatch}
            />)}
        </div>
    )
}