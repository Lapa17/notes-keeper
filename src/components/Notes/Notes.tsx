import { NoteForm } from "./NoteForm/NoteForm";
import { Note } from "./Note/Note";
import { initializeAppTC } from "../../state/reducer";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { useEffect } from "react";
import { Loader } from "../Loader/Loader";

export type NoteType = {
    id: string
    title: string
    description: string
    tags: string[]
}


export const Notes = () => {

    const state = useAppSelector(state => state.app)
    const initializedStatus = useAppSelector(state => state.status.status)
    const isFiltered = useAppSelector(state => state.status.isFiltered)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const resetFilterHelper = () => {
        dispatch(initializeAppTC())
    }

    return (
        <div >
            {initializedStatus === 'loading' && <Loader />}
            <NoteForm notes={state} />

            <div className="notes--container">
                {state && state.map((el) => <Note key={el.id} note={el} />)}
            </div>
            {isFiltered &&
                <div className="notes--initialized--container">
                    <div className="notes--initialized" onClick={resetFilterHelper}>Reset filter</div>
                </div>}
        </div>
    )
}