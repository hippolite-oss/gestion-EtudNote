import React, { useState, useEffect } from "react";
import { FaUserGraduate, FaBook, FaClipboardList, FaChartLine, FaSignOutAlt, FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiTrendingUp, FiActivity } from "react-icons/fi";
import CardStat from "../components/CardStat";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Surveillance de la largeur de fenêtre pour l'adaptabilité
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Réduire automatiquement la sidebar sur petits écrans
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Fonction pour générer les jours du mois
  const generateDaysOfMonth = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];
    
    // Jours vides pour le début du mois
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Jours du mois
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const stats = [
    { 
      icon: <FaUserGraduate />, 
      label: "Étudiants", 
      value: 120,
      change: "+5%",
      trend: "up"
    },
    { 
      icon: <FaBook />, 
      label: "Matières", 
      value: 12,
      change: "+2",
      trend: "up"
    },
    { 
      icon: <FaClipboardList />, 
      label: "Notes", 
      value: 450,
      change: "+18",
      trend: "up"
    },
    { 
      icon: <FaChartLine />, 
      label: "Moyenne générale", 
      value: "14.5",
      change: "+0.3",
      trend: "up"
    },
  ];

  // Données pour le graphique à barres
  const gradeData = [
    { matière: "Mathématiques", moyenne: 15.2, couleur: "#4F46E5", objectif: 16.0 },
    { matière: "Physique", moyenne: 13.8, couleur: "#10B981", objectif: 14.5 },
    { matière: "Informatique", moyenne: 16.5, couleur: "#F59E0B", objectif: 15.0 },
    { matière: "Anglais", moyenne: 14.3, couleur: "#EF4444", objectif: 15.0 },
    { matière: "Histoire", moyenne: 12.9, couleur: "#8B5CF6", objectif: 13.5 },
  ];

  // Données pour le graphique circulaire
  const studentDistribution = [
    { niveau: "Licence 1", count: 45, couleur: "#4F46E5" },
    { niveau: "Licence 2", count: 38, couleur: "#10B981" },
    { niveau: "Licence 3", count: 27, couleur: "#F59E0B" },
    { niveau: "Master", count: 10, couleur: "#EF4444" },
  ];

  // Calcul du total pour les pourcentages
  const totalStudents = studentDistribution.reduce((sum, item) => sum + item.count, 0);

  // Événements du calendrier
  const calendarEvents = [
    { date: "15 Nov", title: "Examen Mathématiques", type: "exam", time: "09:00" },
    { date: "18 Nov", title: "Réunion département", type: "meeting", time: "14:30" },
    { date: "22 Nov", title: "Rendu projet", type: "deadline", time: "23:59" },
    { date: "25 Nov", title: "Congé académique", type: "holiday", time: "Toute la journée" },
    { date: "30 Nov", title: "Conseil de classe", type: "meeting", time: "16:00" },
  ];

  // Jours du mois actuel
  const daysOfMonth = generateDaysOfMonth(currentMonth, currentYear);
  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
                      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} />

      {/* Bouton toggle pour la sidebar sur mobile */}
      <button 
        className="sidebar-toggle-btn"
        onClick={toggleSidebar}
      >
        {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      {/* Contenu Dashboard */}
      <div className={`dashboard-main-container ${sidebarCollapsed ? 'expanded' : ''}`}>
        {/* ------------------- HEADER -------------------- */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1>Tableau de Bord</h1>
            <p className="dashboard-subtitle">
              {windowWidth < 768 
                ? "Bienvenue" 
                : "Bienvenue dans votre espace d'administration"}
            </p>
          </div>
          <div className="header-right">
            <div className="date-display">
              <FaCalendarAlt className="calendar-icon" />
              <span>
                {new Date().toLocaleDateString('fr-FR', { 
                  weekday: windowWidth < 768 ? 'short' : 'long', 
                  year: windowWidth < 768 ? '2-digit' : 'numeric', 
                  month: windowWidth < 768 ? 'short' : 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt size={windowWidth < 768 ? 14 : 16} />
              {windowWidth > 480 && "Déconnexion"}
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
              change={stat.change}
              trend={stat.trend}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* ---------------- Section Graphiques ---------------- */}
        <div className="charts-section">
          {/* Graphique à barres - Moyennes par matière */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>
                <FiTrendingUp className="chart-icon" /> 
                <span>Moyennes par Matière</span>
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
                  <div className="bar-label">
                    {windowWidth < 600 ? item.matière.substring(0, 3) + "." : item.matière}
                  </div>
                  <div className="bar-wrapper">
                    {/* Barre d'objectif */}
                    <div 
                      className="bar-objectif"
                      style={{
                        height: `${(item.objectif / 20) * 100}%`,
                      }}
                      title={`Objectif: ${item.objectif}/20`}
                    />
                    {/* Barre de moyenne */}
                    <div
                      className="bar"
                      style={{
                        height: `${(item.moyenne / 20) * 100}%`,
                        backgroundColor: item.couleur,
                      }}
                      title={`Moyenne: ${item.moyenne}/20`}
                    >
                      <span className="bar-value">
                        {item.moyenne.toFixed(1)}
                      </span>
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
                <FiActivity className="chart-icon" /> 
                <span>Distribution par Niveau</span>
              </h3>
            </div>
            <div className="pie-chart-container">
              <div className="pie-chart-wrapper">
                <svg width="200" height="200" viewBox="0 0 200 200" className="pie-chart-svg">
                  <circle cx="100" cy="100" r="90" fill="#F3F4F6" />
                  {(() => {
                    let cumulativePercent = 0;
                    return studentDistribution.map((item, index) => {
                      const percent = (item.count / totalStudents) * 100;
                      const offset = 25; // Décalage pour éviter le chevauchement
                      const radius = 90 - offset;
                      
                      // Calcul des coordonnées pour l'arc
                      const startAngle = (cumulativePercent * 360) / 100;
                      const endAngle = ((cumulativePercent + percent) * 360) / 100;
                      
                      const startRad = (startAngle - 90) * (Math.PI / 180);
                      const endRad = (endAngle - 90) * (Math.PI / 180);
                      
                      const x1 = 100 + radius * Math.cos(startRad);
                      const y1 = 100 + radius * Math.sin(startRad);
                      const x2 = 100 + radius * Math.cos(endRad);
                      const y2 = 100 + radius * Math.sin(endRad);
                      
                      const largeArcFlag = percent > 50 ? 1 : 0;
                      
                      const pathData = [
                        `M ${100} ${100}`,
                        `L ${x1} ${y1}`,
                        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                        'Z'
                      ].join(' ');
                      
                      cumulativePercent += percent;
                      
                      return (
                        <path
                          key={index}
                          d={pathData}
                          fill={item.couleur}
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          className="pie-segment"
                          opacity="0.8"
                        />
                      );
                    });
                  })()}
                  <circle cx="100" cy="100" r="60" fill="#FFFFFF" />
                  <text 
                    x="100" 
                    y="95" 
                    textAnchor="middle" 
                    className="pie-center-text"
                    fontSize="18"
                    fontWeight="bold"
                    fill="#4F46E5"
                  >
                    {totalStudents}
                  </text>
                  <text 
                    x="100" 
                    y="115" 
                    textAnchor="middle" 
                    className="pie-center-subtext"
                    fontSize="12"
                    fill="#6B7280"
                  >
                    Étudiants
                  </text>
                </svg>
              </div>
              <div className="pie-legend">
                {studentDistribution.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: item.couleur }} />
                    <div className="legend-text">
                      <strong>{item.niveau}</strong>
                      <span>
                        {item.count} étudiants ({((item.count / totalStudents) * 100).toFixed(1)}%)
                      </span>
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
              <div className="calendar-nav">
                <button onClick={handlePrevMonth} className="calendar-nav-btn">
                  <FaChevronLeft />
                </button>
                <span className="current-month">
                  {monthNames[currentMonth]} {currentYear}
                </span>
                <button onClick={handleNextMonth} className="calendar-nav-btn">
                  <FaChevronRight />
                </button>
              </div>
            </div>
            <div className="calendar-grid">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                <div key={day} className="calendar-day-header">
                  {windowWidth < 600 ? day.substring(0, 1) : day}
                </div>
              ))}
              {daysOfMonth.map((day, index) => (
                <div
                  key={index}
                  className={`calendar-day ${day === null ? 'empty' : ''} ${
                    day === new Date().getDate() && 
                    currentMonth === new Date().getMonth() && 
                    currentYear === new Date().getFullYear() ? 'today' : ''
                  }`}
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
            <div className="events-header">
              <h3>Événements à Venir</h3>
              <span className="events-count">{calendarEvents.length} événements</span>
            </div>
            <div className="events-list">
              {calendarEvents.map((event, index) => (
                <div key={index} className={`event-item ${event.type}`}>
                  <div className="event-date-container">
                    <div className="event-date">{event.date}</div>
                    <div className="event-time">{event.time}</div>
                  </div>
                  <div className="event-content">
                    <div className="event-title">{event.title}</div>
                    <div className="event-type">
                      {event.type === 'exam' ? 'Examen' : 
                       event.type === 'meeting' ? 'Réunion' : 
                       event.type === 'deadline' ? 'Délai' : 'Congé'}
                    </div>
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