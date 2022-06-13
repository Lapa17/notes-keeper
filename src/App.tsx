import React, {useState} from 'react';

import './App.css';
import {Notes, NoteType} from "./components/Notes/Notes";
import {Header} from "./components/Header/Header";
import {Context} from "./state/context";
import {notesAPI} from "./api/app-api";

function App() {
    const initialNotes:Array<NoteType> = JSON.parse(localStorage.getItem('notes') as string)
    const onAxiosClick = () => {
        notesAPI.getNotes(null).then(res => {
            debugger
        })
    }


    return (
        <Context.Provider value={initialNotes}>
        <div>
            <Header/>
            <Notes/>
            <div onClick={onAxiosClick}> Axios test</div>
        </div>
        </Context.Provider>
    );
}

export default App;
