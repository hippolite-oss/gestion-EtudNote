import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Gestion Notes</h2>

      <ul className="sidebar-menu">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/etudiants">Étudiants</Link></li>
        <li><Link to="/matieres">Matières</Link></li>
        <li><Link to="/notes">Notes</Link></li>
        <li><Link to="/bulletin">Bulletin</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
