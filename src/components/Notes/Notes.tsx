import {NoteForm} from "./NoteForm/NoteForm";
import {useEffect, useState} from "react";
import {Note} from "./Note/Note";
import {v1} from "uuid";

export type NoteType = {
    id: string
    noteTitle: string
    noteDescription: string
    tags:string[]
}


export const Notes = () => {
    const initialNotes = localStorage.getItem('notes')
    const [notes, setNotes] = useState<Array<NoteType>>(JSON.parse(initialNotes as string))
    useEffect(()=>{
        localStorage.setItem('notes',JSON.stringify(notes))
    }, [notes])

    const onDeleteClickHandler = (id:string) => {
        const filteredNotes = notes.filter(el => el.id !== id)
        setNotes(filteredNotes)
        localStorage.setItem('notes',JSON.stringify(notes))
    }

    return (
        <div>
            <h1>Notes</h1>
            <NoteForm setNotes={setNotes} notes={notes}/>
            {notes && notes.map((el) => <Note key={el.id}
                                              note={el}
                                              onDeleteClickHandler={onDeleteClickHandler}
            />)}
        </div>
    )
}