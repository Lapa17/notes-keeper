import React from 'react';

import './App.css';
import {Notes} from "./components/Notes/Notes";
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
