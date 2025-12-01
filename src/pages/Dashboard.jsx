import React from "react";
import { FaUserGraduate, FaBook, FaClipboardList, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import CardStat from "../components/CardStat";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Si tu utilises un token plus tard, tu le supprimeras ici
    navigate("/");
  };

  const stats = [
    { icon: <FaUserGraduate />, label: "Étudiants", value: 120 },
    { icon: <FaBook />, label: "Matières", value: 12 },
    { icon: <FaClipboardList />, label: "Notes", value: 450 },
    { icon: <FaChartLine />, label: "Moyenne générale", value: "14.5" },
  ];

  return (
    <div style={{ display: "flex" }}>

      {/* Sidebar */}
      <Sidebar />

      {/* Contenu Dashboard */}
      <div className="dashboard-container-with-sidebar">

        {/* ------------------- HEADER -------------------- */}
        <div className="dashboard-header">
          <h1>Dashboard Admin</h1>

          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt size={18} style={{ marginRight: "8px" }} /> Déconnexion
          </button>
        </div>

        {/* ---------------- Stats Cards ---------------- */}
        <div className="cards-container">
          {stats.map((stat, index) => (
            <CardStat
              key={index}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* ---------------- Actions Buttons ---------------- */}
        <div className="actions-container">
          <button onClick={() => navigate("/etudiants")}>Gérer Étudiants</button>
          <button onClick={() => navigate("/matieres")}>Gérer Matières</button>
          <button onClick={() => navigate("/notes")}>Ajouter Note</button>
          <button onClick={() => navigate("/bulletin")}>Voir Bulletin</button>
        </div>
      </div>
    </div>
  );
}
