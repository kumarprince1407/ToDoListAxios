//Routing.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ToDoList from "../components/ToDoList";
import HomePage from "../components/HomePage";
import EditPage from "../components/EditPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ToDoList />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
