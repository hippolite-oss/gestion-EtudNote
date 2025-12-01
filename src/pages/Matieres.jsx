// src/pages/Matieres.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./Matieres.css";

function Matieres() {
  const [libelle, setLibelle] = useState("");
  const [liste, setListe] = useState([]);

  const ajouterMatiere = (e) => {
    e.preventDefault();
    if (!libelle) {
      alert("Veuillez entrer le libellé !");
      return;
    }
    setListe([...liste, { libelle }]);
    setLibelle("");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="page-container">
        <h1>Gérer les Matières</h1>

        <div className="blocks">
          <div className="block card">
            <h2>Ajouter une matière</h2>
            <form onSubmit={ajouterMatiere} className="form-block">
              <label>Libellé</label>
              <input
                type="text"
                value={libelle}
                onChange={(e) => setLibelle(e.target.value)}
              />
              <div className="form-actions">
                <button type="submit" className="btn primary">Ajouter</button>
                <button type="button" className="btn" onClick={() => setLibelle("")}>Annuler</button>
              </div>
            </form>
          </div>

          <div className="block card">
            <h2>Liste des matières ({liste.length})</h2>
            {liste.length === 0 ? (
              <p className="muted">Aucune matière pour l’instant.</p>
            ) : (
              <div className="items-grid">
                {liste.map((m, i) => (
                  <div className="item-card" key={i}>
                    <div className="item-info">
                      <div className="item-title">{m.libelle}</div>
                    </div>
                    <div className="item-actions">
                      <button className="btn small">Modifier</button>
                      <button className="btn small danger" onClick={() => setListe(liste.filter((_, idx) => idx !== i))}>Supprimer</button>
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

export default Matieres;
