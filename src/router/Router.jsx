//Routing.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ToDoList from "../components/ToDoList";
import HomePage from "../components/HomePage";

const Router = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<ToDoList/>}/>
            <Route path="/home" element={<HomePage/>}/>
        </Routes>
        </BrowserRouter>
    );
};

export default Router;