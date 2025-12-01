// src/pages/Etudiants.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./Etudiants.css";

function Etudiants() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [matricule, setMatricule] = useState("");
  const [liste, setListe] = useState([]);

  const ajouterEtudiant = (e) => {
    e.preventDefault();
    if (!nom || !prenom || !matricule) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
    setListe([...liste, { nom, prenom, matricule }]);
    setNom("");
    setPrenom("");
    setMatricule("");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="page-container">
        <h1>Gérer les Étudiants</h1>

        <div className="blocks">
          {/* Bloc formulaire */}
          <div className="block card">
            <h2>Ajouter un étudiant</h2>
            <form onSubmit={ajouterEtudiant} className="form-block">
              <label>Matricule</label>
              <input
                type="text"
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
              />

              <label>Nom</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />

              <label>Prénom</label>
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />

              <div className="form-actions">
                <button type="submit" className="btn primary">Ajouter</button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => { setNom(""); setPrenom(""); setMatricule(""); }}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>

          {/* Bloc liste */}
          <div className="block card">
            <h2>Liste des étudiants ({liste.length})</h2>
            {liste.length === 0 ? (
              <p className="muted">Aucun étudiant pour l’instant.</p>
            ) : (
              <div className="students-grid">
                {liste.map((e, i) => (
                  <div className="student-card" key={i}>
                    <div className="student-head">
                      <div className="avatar">{e.nom?.[0] || "U"}</div>
                      <div>
                        <div className="student-name">{e.nom} {e.prenom}</div>
                        <div className="student-matricule">Matricule: {e.matricule}</div>
                      </div>
                    </div>
                    <div className="student-actions">
                      <button className="btn small">Modifier</button>
                      <button
                        className="btn small danger"
                        onClick={() => setListe(liste.filter((_, idx) => idx !== i))}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Etudiants;
