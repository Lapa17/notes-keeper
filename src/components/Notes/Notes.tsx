import {NoteForm} from "./NoteForm/NoteForm";
import {useContext, useEffect, useReducer, useState} from "react";
import {Note} from "./Note/Note";
import {Context} from "../../state/context";
import reducer from "../../state/reducer";

export type NoteType = {
    id: string
    noteTitle: string
    noteDescription: string
    tags:string[]
}


export const Notes = () => {

    const initialNotes = useContext(Context)
    const [state, dispatch] = useReducer(reducer, initialNotes)

    const onDeleteClickHandler = (id:string) => {
        dispatch({type:'Delete', payload: id})
    }
    const resetFilterHelper = () => {
        dispatch({type:'ResetFilter', payload: {state:initialNotes}})
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