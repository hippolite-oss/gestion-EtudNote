import React from "react";
import { FaUserGraduate, FaBook, FaClipboardList, FaChartLine, FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";
import { FiTrendingUp, FiActivity } from "react-icons/fi";
import CardStat from "../components/CardStat";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const stats = [
    { icon: <FaUserGraduate />, label: "Étudiants", value: 120 },
    { icon: <FaBook />, label: "Matières", value: 12 },
    { icon: <FaClipboardList />, label: "Notes", value: 450 },
    { icon: <FaChartLine />, label: "Moyenne générale", value: "14.5" },
  ];

  // Données pour le graphique à barres
  const gradeData = [
    { matière: "Mathématiques", moyenne: 15.2, couleur: "#4F46E5" },
    { matière: "Physique", moyenne: 13.8, couleur: "#10B981" },
    { matière: "Informatique", moyenne: 16.5, couleur: "#F59E0B" },
    { matière: "Anglais", moyenne: 14.3, couleur: "#EF4444" },
    { matière: "Histoire", moyenne: 12.9, couleur: "#8B5CF6" },
  ];

  // Données pour le graphique circulaire
  const studentDistribution = [
    { niveau: "Licence 1", count: 45, couleur: "#4F46E5" },
    { niveau: "Licence 2", count: 38, couleur: "#10B981" },
    { niveau: "Licence 3", count: 27, couleur: "#F59E0B" },
    { niveau: "Master", count: 10, couleur: "#EF4444" },
  ];

  // Événements du calendrier
  const calendarEvents = [
    { date: "15 Nov", title: "Examen Mathématiques", type: "exam" },
    { date: "18 Nov", title: "Réunion département", type: "meeting" },
    { date: "22 Nov", title: "Rendu projet", type: "deadline" },
    { date: "25 Nov", title: "Congé académique", type: "holiday" },
    { date: "30 Nov", title: "Conseil de classe", type: "meeting" },
  ];

  // Jours du mois
  const daysOfMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu Dashboard */}
      <div className="dashboard-main-container">
        {/* ------------------- HEADER -------------------- */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1>Tableau de Bord</h1>
            <p className="dashboard-subtitle">Bienvenue dans votre espace d'administration</p>
          </div>
          <div className="header-right">
            <div className="date-display">
              <FaCalendarAlt className="calendar-icon" />
              <span>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt size={16} /> Déconnexion
            </button>
          </div>
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

        {/* ---------------- Section Graphiques ---------------- */}
        <div className="charts-section">
          {/* Graphique à barres - Moyennes par matière */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>
                <FiTrendingUp className="chart-icon" /> Moyennes par Matière
              </h3>
              <select className="period-select">
                <option>Ce semestre</option>
                <option>Trimestre dernier</option>
                <option>Année académique</option>
              </select>
            </div>
            <div className="bar-chart">
              {gradeData.map((item, index) => (
                <div key={index} className="bar-container">
                  <div className="bar-label">{item.matière}</div>
                  <div className="bar-wrapper">
                    <div
                      className="bar"
                      style={{
                        height: `${(item.moyenne / 20) * 100}%`,
                        backgroundColor: item.couleur,
                      }}
                    >
                      <span className="bar-value">{item.moyenne.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Graphique circulaire - Distribution des étudiants */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>
                <FiActivity className="chart-icon" /> Distribution par Niveau
              </h3>
            </div>
            <div className="pie-chart-container">
              <div className="pie-chart">
                {studentDistribution.map((item, index, array) => {
                  const total = array.reduce((sum, d) => sum + d.count, 0);
                  return (
                    <div
                      key={index}
                      className="pie-segment"
                      style={{
                        backgroundColor: item.couleur,
                        transform: `rotate(${array.slice(0, index).reduce((sum, d) => sum + (d.count / total) * 360, 0)}deg)`,
                        clipPath: `inset(0 0 0 50%)`,
                        opacity: 0.8 + (index * 0.05),
                      }}
                    />
                  );
                })}
              </div>
              <div className="pie-legend">
                {studentDistribution.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: item.couleur }} />
                    <div className="legend-text">
                      <strong>{item.niveau}</strong>
                      <span>{item.count} étudiants ({(item.count / 120 * 100).toFixed(1)}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- Calendrier & Activités ---------------- */}
        <div className="calendar-section">
          <div className="calendar-card">
            <div className="calendar-header">
              <h3><FaCalendarAlt /> Calendrier Académique</h3>
              <span className="current-month">Novembre 2024</span>
            </div>
            <div className="calendar-grid">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                <div key={day} className="calendar-day-header">{day}</div>
              ))}
              {daysOfMonth.map(day => (
                <div
                  key={day}
                  className={`calendar-day ${day === new Date().getDate() ? 'today' : ''}`}
                >
                  {day}
                  {day === 15 && <div className="calendar-event-dot" style={{ backgroundColor: '#EF4444' }} />}
                  {day === 18 && <div className="calendar-event-dot" style={{ backgroundColor: '#4F46E5' }} />}
                  {day === 22 && <div className="calendar-event-dot" style={{ backgroundColor: '#10B981' }} />}
                </div>
              ))}
            </div>
          </div>

          <div className="events-card">
            <h3>Événements à Venir</h3>
            <div className="events-list">
              {calendarEvents.map((event, index) => (
                <div key={index} className={`event-item ${event.type}`}>
                  <div className="event-date">{event.date}</div>
                  <div className="event-content">
                    <div className="event-title">{event.title}</div>
                    <div className="event-type">{event.type === 'exam' ? 'Examen' : 
                                                event.type === 'meeting' ? 'Réunion' : 
                                                event.type === 'deadline' ? 'Délai' : 'Congé'}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="view-all-btn" onClick={() => navigate("/calendrier")}>
              Voir tout le calendrier →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}