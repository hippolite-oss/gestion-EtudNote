import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/etudiants", label: "Étudiants", icon: "👨‍🎓" },
    { path: "/matieres", label: "Matières", icon: "📚" },
    { path: "/notes", label: "Notes", icon: "📝" },
    { path: "/bulletin", label: "Bulletin", icon: "📄" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Gestion Notes</h1>
        <div className="sidebar-subtitle">Système de gestion</div>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.path} className="menu-item">
              <Link to={item.path} className="menu-link">
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-text">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <span className="user-name">Administrateur</span>
            <span className="user-role">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;