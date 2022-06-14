import React, {useState} from 'react';

import './App.scss';
import {Notes, NoteType} from "./components/Notes/Notes";
import {Header} from "./components/Header/Header";

function App() {
    return (
        <div>
            <Header/>
            <Notes/>
        </div>
    );
}

export default App;
