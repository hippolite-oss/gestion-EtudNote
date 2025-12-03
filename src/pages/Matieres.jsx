import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./Matieres.css";

function Matieres() {
  const [formData, setFormData] = useState({
    libelle: "",
    code: "",
    coefficient: "1",
    enseignant: "",
    couleur: "#4361ee",
    description: ""
  });

  const [matieres, setMatieres] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCoeff, setFilterCoeff] = useState("");

  const enseignants = [
    "M. Dupont (Mathématiques)",
    "Mme. Martin (Physique)",
    "M. Durand (Chimie)",
    "Mme. Lefebvre (SVT)",
    "M. Moreau (Histoire)",
    "Mme. Girard (Français)",
    "M. Laurent (Anglais)",
    "Mme. Petit (Philosophie)"
  ];

  const couleurs = [
    { name: "Bleu", value: "#4361ee" },
    { name: "Vert", value: "#10b981" },
    { name: "Rouge", value: "#ef4444" },
    { name: "Orange", value: "#f59e0b" },
    { name: "Violet", value: "#8b5cf6" },
    { name: "Rose", value: "#ec4899" },
    { name: "Cyan", value: "#06b6d4" },
    { name: "Gris", value: "#6b7280" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const genererCode = (libelle) => {
    if (!libelle) return "MAT-000";
    const initiales = libelle
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 3);
    
    const numero = (matieres.length + 1).toString().padStart(3, '0');
    return `${initiales}-${numero}`;
  };

  const ajouterMatiere = (e) => {
    e.preventDefault();
    
    if (!formData.libelle.trim()) {
      alert("Veuillez entrer le libellé de la matière !");
      return;
    }

    const nouvelleMatiere = {
      id: Date.now(),
      ...formData,
      code: formData.code || genererCode(formData.libelle),
      dateCreation: new Date().toLocaleDateString('fr-FR'),
      etudiantsInscrits: Math.floor(Math.random() * 30) + 10,
      heuresSemaine: Math.floor(Math.random() * 6) + 2
    };

    if (editingId !== null) {
      // Modification
      setMatieres(prev => prev.map(m => 
        m.id === editingId ? nouvelleMatiere : m
      ));
      setEditingId(null);
    } else {
      // Ajout
      setMatieres(prev => [nouvelleMatiere, ...prev]);
    }

    // Réinitialiser le formulaire
    setFormData({
      libelle: "",
      code: "",
      coefficient: "1",
      enseignant: "",
      couleur: "#4361ee",
      description: ""
    });
  };

  const modifierMatiere = (matiere) => {
    setFormData(matiere);
    setEditingId(matiere.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const supprimerMatiere = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette matière ?")) {
      setMatieres(prev => prev.filter(m => m.id !== id));
    }
  };

  const filtrerMatieres = matieres.filter(matiere => {
    const matchesSearch = 
      matiere.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      matiere.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      matiere.enseignant.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCoeff = !filterCoeff || matiere.coefficient === filterCoeff;
    
    return matchesSearch && matchesCoeff;
  });

  const getMatiereIcon = (libelle) => {
    const icons = {
      'Math': '∫',
      'Physique': '⚛️',
      'Chimie': '🧪',
      'SVT': '🔬',
      'Français': '📚',
      'Anglais': '🌍',
      'Histoire': '🏛️',
      'Géographie': '🗺️',
      'Philosophie': '💭',
      'Sport': '⚽',
      'Arts': '🎨',
      'Musique': '🎵'
    };
    
    for (const key in icons) {
      if (libelle.toLowerCase().includes(key.toLowerCase())) {
        return icons[key];
      }
    }
    return '📖';
  };

  const getCoefficientColor = (coeff) => {
    const coeffNum = parseInt(coeff);
    if (coeffNum >= 4) return "#ef4444";
    if (coeffNum >= 3) return "#f59e0b";
    if (coeffNum >= 2) return "#3b82f6";
    return "#10b981";
  };

  // Données d'exemple au chargement
  useEffect(() => {
    const exemples = [
      { id: 1, libelle: "Mathématiques", code: "MAT-001", coefficient: "4", enseignant: "M. Dupont (Mathématiques)", couleur: "#4361ee", description: "Algèbre, géométrie, analyse", dateCreation: "01/09/2023", etudiantsInscrits: 45, heuresSemaine: 6 },
      { id: 2, libelle: "Physique-Chimie", code: "PHC-002", coefficient: "3", enseignant: "Mme. Martin (Physique)", couleur: "#ef4444", description: "Mécanique, thermodynamique, chimie organique", dateCreation: "01/09/2023", etudiantsInscrits: 38, heuresSemaine: 5 },
      { id: 3, libelle: "Sciences de la Vie et de la Terre", code: "SVT-003", coefficient: "2", enseignant: "Mme. Lefebvre (SVT)", couleur: "#10b981", description: "Biologie, géologie, écologie", dateCreation: "01/09/2023", etudiantsInscrits: 42, heuresSemaine: 4 },
      { id: 4, libelle: "Français", code: "FRA-004", coefficient: "3", enseignant: "Mme. Girard (Français)", couleur: "#8b5cf6", description: "Littérature, grammaire, expression écrite", dateCreation: "01/09/2023", etudiantsInscrits: 48, heuresSemaine: 5 },
      { id: 5, libelle: "Anglais", code: "ANG-005", coefficient: "2", enseignant: "M. Laurent (Anglais)", couleur: "#f59e0b", description: "Compréhension et expression orale/écrite", dateCreation: "01/09/2023", etudiantsInscrits: 40, heuresSemaine: 3 },
      { id: 6, libelle: "Histoire-Géographie", code: "HIS-006", coefficient: "2", enseignant: "M. Moreau (Histoire)", couleur: "#06b6d4", description: "Histoire mondiale et géographie humaine", dateCreation: "01/09/2023", etudiantsInscrits: 35, heuresSemaine: 4 },
    ];
    setMatieres(exemples);
  }, []);

  return (
    <div className="matieres-container">
      <Sidebar />
      
      <main className="matieres-main">
        {/* En-tête */}
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">
              <span className="page-icon">📚</span>
              Gestion des Matières
            </h1>
            <p className="page-subtitle">
              Gérez le programme scolaire et les matières enseignées
            </p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-value">{matieres.length}</span>
              <span className="stat-label">Matières</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">
                {matieres.reduce((acc, m) => acc + parseInt(m.coefficient), 0)}
              </span>
              <span className="stat-label">Coefficients totaux</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">
                {matieres.reduce((acc, m) => acc + m.etudiantsInscrits, 0)}
              </span>
              <span className="stat-label">Étudiants inscrits</span>
            </div>
          </div>
        </div>

        <div className="content-wrapper">
          {/* Formulaire */}
          <div className="form-section">
            <div className="form-card">
              <div className="form-header">
                <h2 className="form-title">
                  {editingId !== null ? "✏️ Modifier la matière" : "➕ Ajouter une matière"}
                </h2>
                {editingId !== null && (
                  <button 
                    className="btn btn-outline"
                    onClick={() => {
                      setFormData({
                        libelle: "",
                        code: "",
                        coefficient: "1",
                        enseignant: "",
                        couleur: "#4361ee",
                        description: ""
                      });
                      setEditingId(null);
                    }}
                  >
                    Annuler
                  </button>
                )}
              </div>

              <form onSubmit={ajouterMatiere} className="matiere-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Libellé <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="libelle"
                      value={formData.libelle}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Ex: Mathématiques"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Code <span className="optional">(auto-généré si vide)</span>
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Ex: MAT-001"
                    />
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
                        <option key={coeff} value={coeff.toString()}>
                          Coefficient {coeff}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Enseignant</label>
                    <select
                      name="enseignant"
                      value={formData.enseignant}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Sélectionner un enseignant</option>
                      {enseignants.map((ens, index) => (
                        <option key={index} value={ens}>{ens}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Couleur thématique</label>
                    <div className="color-picker">
                      {couleurs.map((couleur, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`color-option ${formData.couleur === couleur.value ? 'selected' : ''}`}
                          style={{ backgroundColor: couleur.value }}
                          onClick={() => setFormData(prev => ({ ...prev, couleur: couleur.value }))}
                          title={couleur.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="form-input textarea"
                      placeholder="Description de la matière..."
                      rows="3"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary btn-lg">
                    {editingId !== null ? "Mettre à jour" : "Ajouter la matière"}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setFormData({
                        libelle: "",
                        code: "",
                        coefficient: "1",
                        enseignant: "",
                        couleur: "#4361ee",
                        description: ""
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

          {/* Liste des matières */}
          <div className="list-section">
            <div className="list-header">
              <div className="list-info">
                <h2 className="list-title">Liste des matières</h2>
                <span className="list-count">{filtrerMatieres.length} matière{filtrerMatieres.length !== 1 ? 's' : ''}</span>
              </div>
              
              <div className="list-controls">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Rechercher une matière..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <span className="search-icon">🔍</span>
                </div>
                
                <select
                  value={filterCoeff}
                  onChange={(e) => setFilterCoeff(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Tous coefficients</option>
                  {[1, 2, 3, 4, 5, 6].map(coeff => (
                    <option key={coeff} value={coeff.toString()}>Coeff {coeff}</option>
                  ))}
                </select>
              </div>
            </div>

            {filtrerMatieres.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📚</div>
                <h3 className="empty-title">Aucune matière trouvée</h3>
                <p className="empty-message">
                  {matieres.length === 0 
                    ? "Commencez par ajouter votre première matière"
                    : "Aucune matière ne correspond à votre recherche"}
                </p>
              </div>
            ) : (
              <div className="matieres-grid">
                {filtrerMatieres.map((matiere) => (
                  <div 
                    className="matiere-card" 
                    key={matiere.id}
                    style={{ 
                      borderLeft: `4px solid ${matiere.couleur}`,
                      background: `linear-gradient(to right, ${matiere.couleur}10, white)`
                    }}
                  >
                    <div className="matiere-header">
                      <div className="matiere-icon" style={{ backgroundColor: matiere.couleur }}>
                        {getMatiereIcon(matiere.libelle)}
                      </div>
                      <div className="matiere-titles">
                        <h3 className="matiere-name">{matiere.libelle}</h3>
                        <div className="matiere-code">{matiere.code}</div>
                      </div>
                      <div className="matiere-badges">
                        <span 
                          className="coeff-badge"
                          style={{ 
                            backgroundColor: getCoefficientColor(matiere.coefficient),
                            color: 'white'
                          }}
                        >
                          Coeff {matiere.coefficient}
                        </span>
                      </div>
                    </div>
                    
                    {matiere.description && (
                      <p className="matiere-description">{matiere.description}</p>
                    )}
                    
                    <div className="matiere-details">
                      <div className="detail-row">
                        <div className="detail-item">
                          <span className="detail-icon">👨‍🏫</span>
                          <span className="detail-text">{matiere.enseignant || "Non assigné"}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-icon">👨‍🎓</span>
                          <span className="detail-text">{matiere.etudiantsInscrits} étudiants</span>
                        </div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-item">
                          <span className="detail-icon">⏰</span>
                          <span className="detail-text">{matiere.heuresSemaine}h/semaine</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-icon">📅</span>
                          <span className="detail-text">Créée le {matiere.dateCreation}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="matiere-actions">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => modifierMatiere(matiere)}
                      >
                        <span className="btn-icon">✏️</span>
                        Modifier
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => supprimerMatiere(matiere.id)}
                      >
                        <span className="btn-icon">🗑️</span>
                        Supprimer
                      </button>
                      <button className="action-btn details-btn">
                        <span className="btn-icon">📊</span>
                        Statistiques
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

export default Matieres;