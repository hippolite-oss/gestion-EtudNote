import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./Etudiants.css";

function Etudiants() {
  const [formData, setFormData] = useState({
    matricule: "",
    nom: "",
    prenom: "",
    classe: "",
    dateNaissance: "",
    email: ""
  });

  const [etudiants, setEtudiants] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClasse, setFilterClasse] = useState("");

  // Classes disponibles
  const classes = [
    "3ème A", "3ème B", "3ème C",
    "2nd A", "2nd B", "2nd C",
    "1ère A", "1ère B", "1ère C",
    "Terminale A", "Terminale B", "Terminale C"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const genererMatricule = () => {
    const date = new Date();
    const annee = date.getFullYear().toString().slice(-2);
    const numero = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ETU${annee}${numero}`;
  };

  const ajouterEtudiant = (e) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.prenom || !formData.classe) {
      alert("Veuillez remplir les champs obligatoires !");
      return;
    }

    const nouvelEtudiant = {
      ...formData,
      id: Date.now(),
      matricule: formData.matricule || genererMatricule(),
      dateInscription: new Date().toLocaleDateString('fr-FR'),
      moyenneGenerale: 0.0
    };

    if (editingIndex !== null) {
      // Modification
      const updated = [...etudiants];
      updated[editingIndex] = nouvelEtudiant;
      setEtudiants(updated);
      setEditingIndex(null);
    } else {
      // Ajout
      setEtudiants(prev => [nouvelEtudiant, ...prev]);
    }

    // Réinitialiser le formulaire
    setFormData({
      matricule: "",
      nom: "",
      prenom: "",
      classe: "",
      dateNaissance: "",
      email: ""
    });
  };

  const modifierEtudiant = (index) => {
    const etudiant = etudiants[index];
    setFormData(etudiant);
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const supprimerEtudiant = (index) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) {
      setEtudiants(prev => prev.filter((_, i) => i !== index));
    }
  };

  const filtrerEtudiants = etudiants.filter(etudiant => {
    const matchesSearch = 
      etudiant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      etudiant.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      etudiant.matricule.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClasse = !filterClasse || etudiant.classe === filterClasse;
    
    return matchesSearch && matchesClasse;
  });

  const getInitiales = (nom, prenom) => {
    return `${nom?.[0] || ''}${prenom?.[0] || ''}`.toUpperCase();
  };

  const getClasseColor = (classe) => {
    const colors = {
      '3ème': '#EF4444',
      '2nd': '#3B82F6',
      '1ère': '#10B981',
      'Terminale': '#8B5CF6'
    };
    
    for (const key in colors) {
      if (classe?.includes(key)) return colors[key];
    }
    return '#6B7280';
  };

  // Données d'exemple au chargement
  useEffect(() => {
    const exemples = [
      { id: 1, matricule: "ETU24001", nom: "Dubois", prenom: "Marie", classe: "Terminale A", dateNaissance: "15/03/2006", email: "marie.dubois@email.com", dateInscription: "01/09/2023", moyenneGenerale: 14.5 },
      { id: 2, matricule: "ETU24002", nom: "Martin", prenom: "Lucas", classe: "1ère B", dateNaissance: "22/07/2007", email: "lucas.martin@email.com", dateInscription: "01/09/2023", moyenneGenerale: 12.8 },
      { id: 3, matricule: "ETU24003", nom: "Bernard", prenom: "Emma", classe: "2nd A", dateNaissance: "10/11/2008", email: "emma.bernard@email.com", dateInscription: "01/09/2023", moyenneGenerale: 15.2 },
      { id: 4, matricule: "ETU24004", nom: "Petit", prenom: "Hugo", classe: "3ème C", dateNaissance: "05/01/2009", email: "hugo.petit@email.com", dateInscription: "01/09/2023", moyenneGenerale: 11.3 },
    ];
    setEtudiants(exemples);
  }, []);

  return (
    <div className="etudiants-container">
      <Sidebar />
      
      <main className="etudiants-main">
        {/* En-tête */}
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">
              <span className="page-icon">👨‍🎓</span>
              Gestion des Étudiants
            </h1>
            <p className="page-subtitle">
              Gérez les inscriptions, les informations et les profils des étudiants
            </p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-value">{etudiants.length}</span>
              <span className="stat-label">Étudiants inscrits</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{classes.length}</span>
              <span className="stat-label">Classes</span>
            </div>
          </div>
        </div>

        <div className="content-wrapper">
          {/* Formulaire */}
          <div className="form-section">
            <div className="form-card">
              <div className="form-header">
                <h2 className="form-title">
                  {editingIndex !== null ? "✏️ Modifier l'étudiant" : "➕ Ajouter un étudiant"}
                </h2>
                {editingIndex !== null && (
                  <button 
                    className="btn btn-outline"
                    onClick={() => {
                      setFormData({
                        matricule: "",
                        nom: "",
                        prenom: "",
                        classe: "",
                        dateNaissance: "",
                        email: ""
                      });
                      setEditingIndex(null);
                    }}
                  >
                    Annuler
                  </button>
                )}
              </div>

              <form onSubmit={ajouterEtudiant} className="etudiant-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Matricule <span className="optional">(auto-généré si vide)</span>
                    </label>
                    <input
                      type="text"
                      name="matricule"
                      value={formData.matricule}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Ex: ETU24001"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Nom <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Entrez le nom"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Prénom <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Entrez le prénom"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Classe <span className="required">*</span>
                    </label>
                    <select
                      name="classe"
                      value={formData.classe}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">Sélectionner une classe</option>
                      {classes.map((classe, index) => (
                        <option key={index} value={classe}>{classe}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Date de naissance</label>
                    <input
                      type="date"
                      name="dateNaissance"
                      value={formData.dateNaissance}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="etudiant@email.com"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary btn-lg">
                    {editingIndex !== null ? "Mettre à jour" : "Ajouter l'étudiant"}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setFormData({
                        matricule: "",
                        nom: "",
                        prenom: "",
                        classe: "",
                        dateNaissance: "",
                        email: ""
                      });
                      setEditingIndex(null);
                    }}
                  >
                    Réinitialiser
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Liste des étudiants */}
          <div className="list-section">
            <div className="list-header">
              <div className="list-info">
                <h2 className="list-title">Liste des étudiants</h2>
                <span className="list-count">{filtrerEtudiants.length} étudiant{filtrerEtudiants.length !== 1 ? 's' : ''}</span>
              </div>
              
              <div className="list-controls">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Rechercher un étudiant..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <span className="search-icon">🔍</span>
                </div>
                
                <select
                  value={filterClasse}
                  onChange={(e) => setFilterClasse(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Toutes les classes</option>
                  {classes.map((classe, index) => (
                    <option key={index} value={classe}>{classe}</option>
                  ))}
                </select>
              </div>
            </div>

            {filtrerEtudiants.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👨‍🎓</div>
                <h3 className="empty-title">Aucun étudiant trouvé</h3>
                <p className="empty-message">
                  {etudiants.length === 0 
                    ? "Commencez par ajouter votre premier étudiant"
                    : "Aucun étudiant ne correspond à votre recherche"}
                </p>
              </div>
            ) : (
              <div className="students-grid">
                {filtrerEtudiants.map((etudiant, index) => (
                  <div className="student-card" key={etudiant.id || index}>
                    <div className="student-header">
                      <div 
                        className="student-avatar"
                        style={{ 
                          background: `linear-gradient(135deg, ${getClasseColor(etudiant.classe)}, ${getClasseColor(etudiant.classe)}80)`
                        }}
                      >
                        {getInitiales(etudiant.nom, etudiant.prenom)}
                      </div>
                      <div className="student-badges">
                        <span 
                          className="classe-badge"
                          style={{ backgroundColor: getClasseColor(etudiant.classe) }}
                        >
                          {etudiant.classe}
                        </span>
                        <span className="matricule-badge">
                          {etudiant.matricule}
                        </span>
                      </div>
                    </div>
                    
                    <div className="student-info">
                      <h3 className="student-name">
                        {etudiant.prenom} {etudiant.nom}
                      </h3>
                      
                      <div className="student-details">
                        {etudiant.email && (
                          <div className="detail-item">
                            <span className="detail-icon">📧</span>
                            <span className="detail-text">{etudiant.email}</span>
                          </div>
                        )}
                        
                        {etudiant.dateNaissance && (
                          <div className="detail-item">
                            <span className="detail-icon">🎂</span>
                            <span className="detail-text">{etudiant.dateNaissance}</span>
                          </div>
                        )}
                        
                        <div className="detail-item">
                          <span className="detail-icon">📅</span>
                          <span className="detail-text">Inscrit le {etudiant.dateInscription}</span>
                        </div>
                      </div>
                      
                      <div className="student-stats">
                        <div className="stat">
                          <span className="stat-value">{etudiant.moyenneGenerale.toFixed(1)}</span>
                          <span className="stat-label">Moyenne</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="student-actions">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => modifierEtudiant(etudiants.findIndex(e => e.id === etudiant.id))}
                      >
                        <span className="btn-icon">✏️</span>
                        Modifier
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => supprimerEtudiant(etudiants.findIndex(e => e.id === etudiant.id))}
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

export default Etudiants;