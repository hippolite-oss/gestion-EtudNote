import React, { useEffect, useState } from "react";
import { 
  FaUserGraduate, 
  FaBook, 
  FaClipboardList, 
  FaChartLine, 
  FaSignOutAlt, 
  FaCalendarAlt,
  FaChevronRight,
  FaBell,
  FaSearch
} from "react-icons/fa";
import { FiTrendingUp, FiActivity } from "react-icons/fi";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import CardStat from "../components/CardStat";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("month");
  const [notificationCount, setNotificationCount] = useState(3);

  const handleLogout = () => {
    navigate("/");
  };

  const stats = [
    { 
      icon: <FaUserGraduate />, 
      label: "Étudiants", 
      value: 120, 
      change: "+12%",
      trend: "up",
      delay: 0.1
    },
    { 
      icon: <FaBook />, 
      label: "Matières", 
      value: 12, 
      change: "+2",
      trend: "up",
      delay: 0.2
    },
    { 
      icon: <FaClipboardList />, 
      label: "Notes", 
      value: 450, 
      change: "+5.3%",
      trend: "up",
      delay: 0.3
    },
    { 
      icon: <FaChartLine />, 
      label: "Moyenne générale", 
      value: "14.5", 
      change: "+0.8",
      trend: "up",
      delay: 0.4
    },
  ];

  const gradeData = [
    { matière: "Maths", moyenne: 15.2, couleur: "#667eea", objectif: 16 },
    { matière: "Physique", moyenne: 13.8, couleur: "#764ba2", objectif: 15 },
    { matière: "Informatique", moyenne: 16.5, couleur: "#f093fb", objectif: 16 },
    { matière: "Anglais", moyenne: 14.3, couleur: "#4facfe", objectif: 15 },
    { matière: "Histoire", moyenne: 12.9, couleur: "#43e97b", objectif: 14 },
    { matière: "Philosophie", moyenne: 11.7, couleur: "#fa709a", objectif: 13 },
  ];

  const studentDistribution = [
    { niveau: "Licence 1", count: 45, couleur: "#667eea" },
    { niveau: "Licence 2", count: 38, couleur: "#764ba2" },
    { niveau: "Licence 3", count: 27, couleur: "#f093fb" },
    { niveau: "Master", count: 10, couleur: "#4facfe" },
  ];

  const calendarEvents = [
    { date: "15 Nov", title: "Examen Mathématiques", type: "exam", time: "09:00-12:00" },
    { date: "18 Nov", title: "Réunion département", type: "meeting", time: "14:00-16:00" },
    { date: "22 Nov", title: "Rendu projet", type: "deadline", time: "23:59" },
    { date: "25 Nov", title: "Congé académique", type: "holiday", time: "Journée" },
    { date: "30 Nov", title: "Conseil de classe", type: "meeting", time: "10:00-12:00" },
  ];

  const recentActivities = [
    { user: "Dr. Martin", action: "a ajouté des notes", time: "Il y a 2 heures", subject: "Mathématiques" },
    { user: "Prof. Dubois", action: "a programmé un examen", time: "Il y a 5 heures", subject: "Physique" },
    { user: "Admin", action: "a mis à jour le calendrier", time: "Il y a 1 jour", subject: "Général" },
    { user: "Dr. Martin", action: "a corrigé des copies", time: "Il y a 2 jours", subject: "Informatique" },
  ];

  const daysOfMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const currentDay = new Date().getDate();

  useEffect(() => {
    // Animation d'entrée
    const timer = setTimeout(() => {
      document.querySelectorAll('.animate-on-load').forEach(el => {
        el.classList.add('animate-in');
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      
      <div className="dashboard-main-container">
        {/* Header avec recherche et notifications */}
        <div className="dashboard-header animate-on-load">
          <div className="header-left">
            <div className="welcome-section">
              <h1 className="welcome-title">Bonjour, Administrateur</h1>
              <p className="welcome-subtitle">Voici un aperçu de vos performances académiques</p>
            </div>
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Rechercher étudiants, matières, notes..." 
                className="search-input"
              />
            </div>
          </div>
          
          <div className="header-right">
            <div className="notification-bell">
              <FaBell className="bell-icon" />
              {notificationCount > 0 && (
                <span className="notification-count">{notificationCount}</span>
              )}
            </div>
            
            <div className="date-display">
              <FaCalendarAlt className="calendar-icon" />
              <div className="date-text">
                <span className="date-day">{new Date().toLocaleDateString('fr-FR', { weekday: 'long' })}</span>
                <span className="date-full">{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
            
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt size={16} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="cards-container">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="stat-card animate-on-load"
              style={{ animationDelay: `${stat.delay}s` }}
            >
              <div className="stat-icon-wrapper" style={{ animationDelay: `${stat.delay + 0.1}s` }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <span className="stat-label">{stat.label}</span>
                <div className="stat-value-row">
                  <h3 className="stat-value">{stat.value}</h3>
                  <span className={`stat-change ${stat.trend}`}>
                    {stat.trend === 'up' ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                    {stat.change}
                  </span>
                </div>
                <div className="stat-progress">
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: '75%',
                      background: stat.trend === 'up' 
                        ? 'linear-gradient(90deg, var(--success), var(--success-light))' 
                        : 'linear-gradient(90deg, var(--danger), var(--danger-light))'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Graphiques */}
        <div className="charts-section">
          <div className="chart-card animate-on-load">
            <div className="chart-header">
              <div className="chart-title">
                <FiTrendingUp className="chart-icon" />
                <h3>Moyennes par Matière</h3>
              </div>
              <div className="view-toggles">
                <button 
                  className={`view-toggle ${activeView === 'week' ? 'active' : ''}`}
                  onClick={() => setActiveView('week')}
                >
                  Semaine
                </button>
                <button 
                  className={`view-toggle ${activeView === 'month' ? 'active' : ''}`}
                  onClick={() => setActiveView('month')}
                >
                  Mois
                </button>
                <button 
                  className={`view-toggle ${activeView === 'year' ? 'active' : ''}`}
                  onClick={() => setActiveView('year')}
                >
                  Année
                </button>
              </div>
            </div>
            
            <div className="bar-chart-container">
              {gradeData.map((item, index) => (
                <div key={index} className="bar-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="bar-info">
                    <span className="bar-label">{item.matière}</span>
                    <span className="bar-value">{item.moyenne.toFixed(1)}/20</span>
                  </div>
                  <div className="bar-wrapper">
                    <div 
                      className="bar-background"
                      style={{ height: '100%' }}
                    >
                      <div 
                        className="bar-fill"
                        style={{ 
                          height: `${(item.moyenne / 20) * 100}%`,
                          background: `linear-gradient(to top, ${item.couleur}, ${item.couleur}cc)`
                        }}
                      />
                      <div 
                        className="bar-target"
                        style={{ 
                          bottom: `${(item.objectif / 20) * 100}%`,
                          borderColor: item.couleur
                        }}
                      />
                    </div>
                  </div>
                  <div className="bar-tooltip">
                    Objectif: {item.objectif}/20
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-card animate-on-load">
            <div className="chart-header">
              <div className="chart-title">
                <FiActivity className="chart-icon" />
                <h3>Distribution par Niveau</h3>
              </div>
            </div>
            
            <div className="pie-chart-container">
              <div className="pie-chart-wrapper">
                <div className="pie-chart">
                  {studentDistribution.map((item, index, array) => {
                    const total = array.reduce((sum, d) => sum + d.count, 0);
                    const percentage = (item.count / total) * 100;
                    const offset = array.slice(0, index).reduce((sum, d) => sum + (d.count / total) * 360, 0);
                    
                    return (
                      <div
                        key={index}
                        className="pie-segment"
                        style={{
                          backgroundColor: item.couleur,
                          transform: `rotate(${offset}deg)`,
                          clipPath: `inset(0 0 0 50%)`,
                          opacity: 0.9,
                          animationDelay: `${index * 0.1}s`
                        }}
                      />
                    );
                  })}
                </div>
                <div className="pie-center">
                  <span className="pie-total">{total}</span>
                  <span className="pie-label">Étudiants</span>
                </div>
              </div>
              
              <div className="pie-legend">
                {studentDistribution.map((item, index) => (
                  <div key={index} className="legend-item" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="legend-marker" style={{ backgroundColor: item.couleur }} />
                    <div className="legend-content">
                      <span className="legend-title">{item.niveau}</span>
                      <div className="legend-stats">
                        <span className="legend-count">{item.count} étudiants</span>
                        <span className="legend-percentage">
                          {((item.count / 120) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Calendrier et Activités */}
        <div className="bottom-section">
          <div className="calendar-card animate-on-load">
            <div className="calendar-header">
              <h3><FaCalendarAlt /> Calendrier Académique</h3>
              <div className="calendar-nav">
                <button className="nav-btn">‹</button>
                <span className="current-month">Novembre 2025</span>
                <button className="nav-btn">›</button>
              </div>
            </div>
            
            <div className="calendar-grid">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                <div key={day} className="calendar-day-header">{day}</div>
              ))}
              
              {daysOfMonth.map(day => {
                const hasEvent = calendarEvents.some(event => 
                  parseInt(event.date.split(' ')[0]) === day
                );
                
                return (
                  <div
                    key={day}
                    className={`calendar-day ${day === currentDay ? 'today' : ''} ${hasEvent ? 'has-event' : ''}`}
                  >
                    {day}
                    {day === 15 && <div className="event-dot exam" />}
                    {day === 18 && <div className="event-dot meeting" />}
                    {day === 22 && <div className="event-dot deadline" />}
                    {day === 25 && <div className="event-dot holiday" />}
                    {day === 30 && <div className="event-dot meeting" />}
                  </div>
                );
              })}
            </div>
            
            <div className="calendar-legend">
              <div className="legend-item"><span className="dot exam" />Examen</div>
              <div className="legend-item"><span className="dot meeting" />Réunion</div>
              <div className="legend-item"><span className="dot deadline" />Délai</div>
              <div className="legend-item"><span className="dot holiday" />Congé</div>
            </div>
          </div>

          <div className="right-column">
            <div className="events-card animate-on-load">
              <div className="events-header">
                <h3>Événements à Venir</h3>
                <button className="view-all-btn" onClick={() => navigate("/calendrier")}>
                  Tout voir <FaChevronRight />
                </button>
              </div>
              
              <div className="events-list">
                {calendarEvents.map((event, index) => (
                  <div 
                    key={index} 
                    className={`event-item ${event.type}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="event-date">
                      <span className="event-day">{event.date.split(' ')[0]}</span>
                      <span className="event-month">{event.date.split(' ')[1]}</span>
                    </div>
                    <div className="event-content">
                      <h4 className="event-title">{event.title}</h4>
                      <div className="event-details">
                        <span className="event-type">
                          {event.type === 'exam' ? 'Examen' : 
                           event.type === 'meeting' ? 'Réunion' : 
                           event.type === 'deadline' ? 'Délai' : 'Congé'}
                        </span>
                        <span className="event-time">{event.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="activities-card animate-on-load">
              <h3>Activités Récentes</h3>
              <div className="activities-list">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-avatar">
                      {activity.user.charAt(0)}
                    </div>
                    <div className="activity-content">
                      <p>
                        <strong>{activity.user}</strong> {activity.action}
                        {activity.subject && <span className="activity-subject"> {activity.subject}</span>}
                      </p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}