import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./components/pages/home";
import React from "react";
import Sidebar from "./components/structure/sidebar";

function App() {
    return (
        <div
            className="fixed flex w-full h-full bg-custom-pink-a dark:bg-custom-gray-b std-text transition-all">
            <Sidebar/>
            <div className="flex-1 overflow-auto w-full h-full mx-auto my-auto">
                <Routes className={""}>
                    <Route path='/' element={<Home/>}/>
                </Routes>
            </div>

        </div>
    );
}

export default App;
