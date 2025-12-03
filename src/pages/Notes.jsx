import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./Notes.css";

export default function Notes() {
  const [formData, setFormData] = useState({
    studentId: "",
    matiereId: "",
    note: "",
    coefficient: "1",
    appreciation: "",
    date: new Date().toISOString().split('T')[0]
  });

  const [notesList, setNotesList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStudent, setFilterStudent] = useState("");
  const [filterMatiere, setFilterMatiere] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // Données d'exemple
  const students = [
    { id: 1, name: "Hugues Medegnon", classe: "3ème A", avatar: "HM" },
    { id: 2, name: "Jean Dupont", classe: "3ème B", avatar: "JD" },
    { id: 3, name: "Marie Martin", classe: "Terminale S", avatar: "MM" },
    { id: 4, name: "Pierre Dubois", classe: "1ère ES", avatar: "PD" },
    { id: 5, name: "Sophie Laurent", classe: "2nd A", avatar: "SL" },
  ];

  const matieres = [
    { id: 1, name: "Mathématiques", coefficient: 4, couleur: "#4361ee", icon: "∫" },
    { id: 2, name: "Physique-Chimie", coefficient: 3, couleur: "#ef4444", icon: "⚛️" },
    { id: 3, name: "SVT", coefficient: 2, couleur: "#10b981", icon: "🔬" },
    { id: 4, name: "Français", coefficient: 3, couleur: "#8b5cf6", icon: "📚" },
    { id: 5, name: "Anglais", coefficient: 2, couleur: "#f59e0b", icon: "🌍" },
    { id: 6, name: "Histoire-Géo", coefficient: 2, couleur: "#06b6d4", icon: "🏛️" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getAppreciation = (note) => {
    const n = parseFloat(note);
    if (n >= 16) return "Excellent";
    if (n >= 14) return "Très bien";
    if (n >= 12) return "Bien";
    if (n >= 10) return "Assez bien";
    if (n >= 8) return "Passable";
    if (n >= 5) return "Insuffisant";
    return "Très insuffisant";
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    
    if (!formData.studentId || !formData.matiereId || !formData.note) {
      alert("Veuillez remplir tous les champs obligatoires !");
      return;
    }

    const selectedStudent = students.find(s => s.id === parseInt(formData.studentId));
    const selectedMatiere = matieres.find(m => m.id === parseInt(formData.matiereId));

    const newNote = {
      id: editingId || Date.now(),
      studentId: formData.studentId,
      studentName: selectedStudent.name,
      studentClasse: selectedStudent.classe,
      studentAvatar: selectedStudent.avatar,
      matiereId: formData.matiereId,
      matiereName: selectedMatiere.name,
      matiereCoefficient: selectedMatiere.coefficient,
      matiereCouleur: selectedMatiere.couleur,
      matiereIcon: selectedMatiere.icon,
      note: parseFloat(formData.note),
      coefficient: parseInt(formData.coefficient),
      appreciation: formData.appreciation || getAppreciation(formData.note),
      points: (parseFloat(formData.note) * parseInt(formData.coefficient)).toFixed(1),
      date: formData.date || new Date().toLocaleDateString('fr-FR'),
      createdAt: new Date().toISOString()
    };

    if (editingId) {
      // Modification
      setNotesList(prev => prev.map(note => 
        note.id === editingId ? newNote : note
      ));
      setEditingId(null);
    } else {
      // Ajout
      setNotesList(prev => [newNote, ...prev]);
    }

    // Réinitialiser le formulaire
    setFormData({
      studentId: "",
      matiereId: "",
      note: "",
      coefficient: "1",
      appreciation: "",
      date: new Date().toISOString().split('T')[0]
    });
  };

  const modifierNote = (note) => {
    setFormData({
      studentId: note.studentId,
      matiereId: note.matiereId,
      note: note.note.toString(),
      coefficient: note.coefficient.toString(),
      appreciation: note.appreciation,
      date: note.date
    });
    setEditingId(note.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const supprimerNote = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette note ?")) {
      setNotesList(prev => prev.filter(note => note.id !== id));
    }
  };

  // Filtrer et trier les notes
  const filteredNotes = notesList
    .filter(note => {
      const matchesSearch = 
        note.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.matiereName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.appreciation.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStudent = !filterStudent || note.studentId === filterStudent;
      const matchesMatiere = !filterMatiere || note.matiereId === filterMatiere;
      
      return matchesSearch && matchesStudent && matchesMatiere;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case "date": return new Date(b.createdAt) - new Date(a.createdAt);
        case "note-desc": return b.note - a.note;
        case "note-asc": return a.note - b.note;
        case "student": return a.studentName.localeCompare(b.studentName);
        case "matiere": return a.matiereName.localeCompare(b.matiereName);
        default: return 0;
      }
    });

  const getNoteColor = (note) => {
    if (note >= 16) return "#10B981";
    if (note >= 14) return "#3B82F6";
    if (note >= 12) return "#8B5CF6";
    if (note >= 10) return "#F59E0B";
    if (note >= 8) return "#F97316";
    return "#EF4444";
  };

  const getNoteLevel = (note) => {
    if (note >= 16) return "Excellent";
    if (note >= 14) return "Très bien";
    if (note >= 12) return "Bien";
    if (note >= 10) return "Assez bien";
    if (note >= 8) return "Passable";
    if (note >= 5) return "Insuffisant";
    return "Très insuffisant";
  };

  // Calcul des statistiques
  const stats = {
    total: notesList.length,
    moyenneGenerale: notesList.length > 0 
      ? (notesList.reduce((acc, n) => acc + n.note, 0) / notesList.length).toFixed(2)
      : 0,
    meilleureNote: notesList.length > 0 
      ? Math.max(...notesList.map(n => n.note))
      : 0,
    pireNote: notesList.length > 0 
      ? Math.min(...notesList.map(n => n.note))
      : 0,
  };

  // Données d'exemple au chargement
  useEffect(() => {
    const exemples = [
      {
        id: 1,
        studentId: "1",
        studentName: "Hugues Medegnon",
        studentClasse: "3ème A",
        studentAvatar: "HM",
        matiereId: "1",
        matiereName: "Mathématiques",
        matiereCoefficient: 4,
        matiereCouleur: "#4361ee",
        matiereIcon: "∫",
        note: 16,
        coefficient: 4,
        appreciation: "Excellent travail",
        points: 64,
        date: "15/03/2024",
        createdAt: "2024-03-15T10:30:00"
      },
      {
        id: 2,
        studentId: "2",
        studentName: "Jean Dupont",
        studentClasse: "3ème B",
        studentAvatar: "JD",
        matiereId: "2",
        matiereName: "Physique-Chimie",
        matiereCoefficient: 3,
        matiereCouleur: "#ef4444",
        matiereIcon: "⚛️",
        note: 14,
        coefficient: 3,
        appreciation: "Très bonne compréhension",
        points: 42,
        date: "18/03/2024",
        createdAt: "2024-03-18T14:20:00"
      },
      {
        id: 3,
        studentId: "1",
        studentName: "Hugues Medegnon",
        studentClasse: "3ème A",
        studentAvatar: "HM",
        matiereId: "4",
        matiereName: "Français",
        matiereCoefficient: 3,
        matiereCouleur: "#8b5cf6",
        matiereIcon: "📚",
        note: 13,
        coefficient: 3,
        appreciation: "Bon travail",
        points: 39,
        date: "20/03/2024",
        createdAt: "2024-03-20T09:15:00"
      },
    ];
    setNotesList(exemples);
  }, []);

  return (
    <div className="notes-container">
      <Sidebar />
      
      <main className="notes-main">
        {/* En-tête */}
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">
              <span className="page-icon">📝</span>
              Gestion des Notes
            </h1>
            <p className="page-subtitle">
              Ajoutez, modifiez et gérez les notes des étudiants
            </p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Notes</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.moyenneGenerale}</span>
              <span className="stat-label">Moyenne générale</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.meilleureNote}</span>
              <span className="stat-label">Meilleure note</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.pireNote}</span>
              <span className="stat-label">Note minimale</span>
            </div>
          </div>
        </div>

        <div className="content-wrapper">
          {/* Formulaire */}
          <div className="form-section">
            <div className="form-card">
              <div className="form-header">
                <h2 className="form-title">
                  {editingId ? "✏️ Modifier la note" : "➕ Ajouter une note"}
                </h2>
                {editingId && (
                  <button 
                    className="btn btn-outline"
                    onClick={() => {
                      setFormData({
                        studentId: "",
                        matiereId: "",
                        note: "",
                        coefficient: "1",
                        appreciation: "",
                        date: new Date().toISOString().split('T')[0]
                      });
                      setEditingId(null);
                    }}
                  >
                    Annuler
                  </button>
                )}
              </div>

              <form onSubmit={handleAddNote} className="note-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Étudiant <span className="required">*</span>
                    </label>
                    <select
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">Sélectionner un étudiant</option>
                      {students.map(student => (
                        <option key={student.id} value={student.id}>
                          {student.name} - {student.classe}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Matière <span className="required">*</span>
                    </label>
                    <select
                      name="matiereId"
                      value={formData.matiereId}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">Sélectionner une matière</option>
                      {matieres.map(matiere => (
                        <option key={matiere.id} value={matiere.id}>
                          {matiere.name} (Coeff: {matiere.coefficient})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Note /20 <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      name="note"
                      min="0"
                      max="20"
                      step="0.5"
                      value={formData.note}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Ex: 15.5"
                      required
                    />
                    {formData.note && (
                      <div className="note-preview">
                        <span className="note-level" style={{ color: getNoteColor(parseFloat(formData.note)) }}>
                          {getNoteLevel(parseFloat(formData.note))}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Coefficient <span className="required">*</span>
                    </label>
                    <select
                      name="coefficient"
                      value={formData.coefficient}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6].map(coeff => (
                        <option key={coeff} value={coeff}>
                          Coefficient {coeff}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Appréciation</label>
                    <textarea
                      name="appreciation"
                      value={formData.appreciation}
                      onChange={handleChange}
                      className="form-input textarea"
                      placeholder="Appréciation personnalisée..."
                      rows="2"
                    />
                    {!formData.appreciation && formData.note && (
                      <div className="auto-appreciation">
                        Appréciation auto: <strong>{getAppreciation(formData.note)}</strong>
                      </div>
                    )}
                  </div>
                </div>

                {formData.note && formData.coefficient && (
                  <div className="note-summary">
                    <div className="summary-item">
                      <span className="summary-label">Points :</span>
                      <span className="summary-value">
                        {(parseFloat(formData.note) * parseInt(formData.coefficient)).toFixed(1)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary btn-lg">
                    {editingId ? "Mettre à jour" : "Ajouter la note"}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setFormData({
                        studentId: "",
                        matiereId: "",
                        note: "",
                        coefficient: "1",
                        appreciation: "",
                        date: new Date().toISOString().split('T')[0]
                      });
                      setEditingId(null);
                    }}
                  >
                    Réinitialiser
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Liste des notes */}
          <div className="list-section">
            <div className="list-header">
              <div className="list-info">
                <h2 className="list-title">Notes enregistrées</h2>
                <span className="list-count">{filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''}</span>
              </div>
              
              <div className="list-controls">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Rechercher une note..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <span className="search-icon">🔍</span>
                </div>
                
                <div className="filters">
                  <select
                    value={filterStudent}
                    onChange={(e) => setFilterStudent(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">Tous les étudiants</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>{student.name}</option>
                    ))}
                  </select>
                  
                  <select
                    value={filterMatiere}
                    onChange={(e) => setFilterMatiere(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">Toutes les matières</option>
                    {matieres.map(matiere => (
                      <option key={matiere.id} value={matiere.id}>{matiere.name}</option>
                    ))}
                  </select>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="filter-select"
                  >
                    <option value="date">Date (récent)</option>
                    <option value="note-desc">Note (décroissant)</option>
                    <option value="note-asc">Note (croissant)</option>
                    <option value="student">Étudiant (A-Z)</option>
                    <option value="matiere">Matière (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {filteredNotes.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3 className="empty-title">Aucune note trouvée</h3>
                <p className="empty-message">
                  {notesList.length === 0 
                    ? "Commencez par ajouter votre première note"
                    : "Aucune note ne correspond à votre recherche"}
                </p>
              </div>
            ) : (
              <div className="notes-grid">
                {filteredNotes.map((note) => (
                  <div className="note-card" key={note.id}>
                    <div className="note-header">
                      <div className="note-matiere" style={{ backgroundColor: note.matiereCouleur }}>
                        <span className="matiere-icon">{note.matiereIcon}</span>
                        <span className="matiere-name">{note.matiereName}</span>
                      </div>
                      <div className="note-value" style={{ color: getNoteColor(note.note) }}>
                        {note.note.toFixed(1)}
                        <span className="note-max">/20</span>
                      </div>
                    </div>
                    
                    <div className="note-content">
                      <div className="student-info">
                        <div className="student-avatar">{note.studentAvatar}</div>
                        <div>
                          <h3 className="student-name">{note.studentName}</h3>
                          <div className="student-classe">{note.studentClasse}</div>
                        </div>
                      </div>
                      
                      <div className="note-details">
                        <div className="detail-row">
                          <div className="detail-item">
                            <span className="detail-label">Coefficient :</span>
                            <span className="detail-value">{note.coefficient}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Points :</span>
                            <span className="detail-value">{note.points}</span>
                          </div>
                        </div>
                        
                        <div className="detail-row">
                          <div className="detail-item">
                            <span className="detail-label">Date :</span>
                            <span className="detail-value">{note.date}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Niveau :</span>
                            <span className="detail-value" style={{ color: getNoteColor(note.note) }}>
                              {getNoteLevel(note.note)}
                            </span>
                          </div>
                        </div>
                        
                        {note.appreciation && (
                          <div className="note-appreciation">
                            <span className="appreciation-label">Appréciation :</span>
                            <p className="appreciation-text">"{note.appreciation}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="note-actions">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => modifierNote(note)}
                      >
                        <span className="btn-icon">✏️</span>
                        Modifier
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => supprimerNote(note.id)}
                      >
                        <span className="btn-icon">🗑️</span>
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}