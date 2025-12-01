// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Etudiants from "./pages/Etudiants";
import Matieres from "./pages/Matieres";
import Notes from "./pages/Notes";
import Bulletin from "./pages/Bulletin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Etudiants" element={<Etudiants />} />
        <Route path="/Matieres" element={<Matieres />} />
        <Route path="/Notes" element={<Notes />} />
        <Route path="/Bulletin" element={<Bulletin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
