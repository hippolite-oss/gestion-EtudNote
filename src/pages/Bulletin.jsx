import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Sidebar from "../components/Sidebar";
import "./Bulletin.css";

export default function Bulletin() {
  const pdfRef = useRef();
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Données d'exemple (à remplacer par backend)
  const students = [
    { id: "1", name: "Hugues Medegnon", classe: "3ème A", annee: "2024-2025" },
    { id: "2", name: "Jean Dupont", classe: "3ème B", annee: "2024-2025" },
    { id: "3", name: "Marie Martin", classe: "Terminale S", annee: "2024-2025" },
    { id: "4", name: "Pierre Dubois", classe: "1ère ES", annee: "2024-2025" },
  ];

  const notesData = {
    "1": [
      { matiere: "Mathématiques", note: 16, coef: 4, appreciation: "Excellent travail" },
      { matiere: "Physique-Chimie", note: 14, coef: 3, appreciation: "Très bien" },
      { matiere: "SVT", note: 13, coef: 2, appreciation: "Bon travail" },
      { matiere: "Français", note: 15, coef: 3, appreciation: "Excellent" },
      { matiere: "Anglais", note: 17, coef: 2, appreciation: "Remarquable" },
      { matiere: "Histoire-Géo", note: 12, coef: 2, appreciation: "Satisfaisant" },
    ],
    "2": [
      { matiere: "Mathématiques", note: 12, coef: 4, appreciation: "Peut mieux faire" },
      { matiere: "Physique-Chimie", note: 10, coef: 3, appreciation: "Passable" },
      { matiere: "Français", note: 11, coef: 3, appreciation: "Moyen" },
      { matiere: "Anglais", note: 14, coef: 2, appreciation: "Bien" },
    ],
  };

  const handleSelectStudent = (e) => {
    setSelectedStudent(e.target.value);
  };

  const student = students.find((s) => s.id === selectedStudent);
  const notes = selectedStudent ? notesData[selectedStudent] || [] : [];
  const totalCoefficient = notes.reduce((acc, n) => acc + n.coef, 0);
  const totalPoints = notes.reduce((acc, n) => acc + (n.note * n.coef), 0);
  const moyenne = notes.length > 0 ? (totalPoints / totalCoefficient).toFixed(2) : null;

  const getMention = (moyenne) => {
    if (!moyenne) return "";
    const m = parseFloat(moyenne);
    if (m >= 16) return { text: "Très Bien", color: "#10B981" };
    if (m >= 14) return { text: "Bien", color: "#3B82F6" };
    if (m >= 12) return { text: "Assez Bien", color: "#8B5CF6" };
    if (m >= 10) return { text: "Passable", color: "#F59E0B" };
    return { text: "Insuffisant", color: "#EF4444" };
  };

  const mention = moyenne ? getMention(moyenne) : { text: "", color: "" };

  const exportPDF = async () => {
    setIsLoading(true);
    try {
      const input = pdfRef.current;
      const canvas = await html2canvas(input, { 
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
      });
      
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${student?.name.replace(/\s+/g, '_')}_bulletin_${new Date().toISOString().slice(0,10)}.pdf`);
    } catch (error) {
      console.error("Erreur lors de l'export PDF:", error);
      alert("Erreur lors de l'export. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bulletin-container">
      <Sidebar />
      
      <main className="bulletin-main">
        <div className="bulletin-header">
          <h1 className="page-title">📋 Bulletin de Notes</h1>
          <p className="page-subtitle">Générez et consultez les bulletins scolaires</p>
        </div>

        <div className="bulletin-content">
          {/* Section de sélection */}
          <div className="selection-card">
            <div className="selection-header">
              <div className="selection-title">
                <span className="icon">👨‍🎓</span>
                <h2>Sélection de l'étudiant</h2>
              </div>
              <div className="student-count">
                <span className="count-badge">{students.length} étudiants</span>
              </div>
            </div>
            
            <div className="select-wrapper">
              <label className="select-label">
                <span className="label-text">Choisir un étudiant :</span>
                <div className="custom-select">
                  <select 
                    onChange={handleSelectStudent} 
                    value={selectedStudent}
                    className="select-input"
                  >
                    <option value="">-- Sélectionner un étudiant --</option>
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} - {s.classe} ({s.annee})
                      </option>
                    ))}
                  </select>
                  <span className="select-arrow">▼</span>
                </div>
              </label>
            </div>
          </div>

          {selectedStudent && student && (
            <>
              {/* Actions */}
              <div className="actions-bar">
                <button 
                  className="action-btn back-btn"
                  onClick={() => navigate("/dashboard")}
                >
                  <span className="btn-icon">←</span>
                  Retour au Dashboard
                </button>
                
                <div className="action-group">
                  <button 
                    className="action-btn print-btn"
                    onClick={() => window.print()}
                  >
                    <span className="btn-icon">🖨️</span>
                    Imprimer
                  </button>
                  <button 
                    className="action-btn export-btn"
                    onClick={exportPDF}
                    disabled={isLoading}
                  >
                    <span className="btn-icon">{isLoading ? "⏳" : "📄"}</span>
                    {isLoading ? "Génération..." : "Exporter PDF"}
                  </button>
                </div>
              </div>

              {/* Carte du bulletin */}
              <div className="bulletin-card" ref={pdfRef}>
                {/* En-tête institutionnel */}
                <div className="institution-header">
                  <div className="institution-logo">
                    <div className="logo-circle">🏫</div>
                  </div>
                  <div className="institution-info">
                    <h1>Lycée Excellence</h1>
                    <p className="institution-subtitle">Établissement d'Enseignement Secondaire</p>
                    <p className="institution-address">123 Avenue de l'Éducation, 75000 Paris</p>
                  </div>
                  <div className="bulletin-stamp">
                    <div className="stamp-content">OFFICIEL</div>
                  </div>
                </div>

                {/* Titre principal */}
                <div className="document-title">
                  <h2>BULLETIN SCOLAIRE</h2>
                  <div className="title-underline"></div>
                </div>

                {/* Informations étudiant */}
                <div className="student-details-grid">
                  <div className="info-box">
                    <span className="info-label">Étudiant :</span>
                    <span className="info-value highlight">{student.name}</span>
                  </div>
                  <div className="info-box">
                    <span className="info-label">Classe :</span>
                    <span className="info-value">{student.classe}</span>
                  </div>
                  <div className="info-box">
                    <span className="info-label">Année scolaire :</span>
                    <span className="info-value">{student.annee}</span>
                  </div>
                  <div className="info-box">
                    <span className="info-label">Date d'édition :</span>
                    <span className="info-value">{new Date().toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                {/* Tableau des notes */}
                <div className="table-container">
                  <table className="grades-table">
                    <thead>
                      <tr>
                        <th className="matiere-col">Matière</th>
                        <th>Note /20</th>
                        <th>Coefficient</th>
                        <th>Points</th>
                        <th>Appréciation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notes.map((n, i) => (
                        <tr key={i} className={i % 2 === 0 ? "even-row" : "odd-row"}>
                          <td className="matiere-cell">{n.matiere}</td>
                          <td>
                            <span className={`note-badge ${n.note >= 10 ? 'note-good' : 'note-low'}`}>
                              {n.note.toFixed(1)}
                            </span>
                          </td>
                          <td><span className="coef-badge">{n.coef}</span></td>
                          <td><strong>{(n.note * n.coef).toFixed(1)}</strong></td>
                          <td className="appreciation-cell">{n.appreciation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Résultats et moyennes */}
                <div className="results-summary">
                  <div className="result-card">
                    <div className="result-label">Total des coefficients</div>
                    <div className="result-value">{totalCoefficient}</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">Total des points</div>
                    <div className="result-value">{totalPoints.toFixed(1)}</div>
                  </div>
                  <div className="result-card highlight">
                    <div className="result-label">Moyenne générale</div>
                    <div className="result-value average-value">{moyenne}/20</div>
                  </div>
                </div>

                {/* Mention et signature */}
                <div className="bulletin-footer">
                  {mention.text && (
                    <div className="mention-section">
                      <span className="mention-label">MENTION :</span>
                      <span 
                        className="mention-text"
                        style={{ color: mention.color, borderColor: mention.color }}
                      >
                        {mention.text}
                      </span>
                    </div>
                  )}
                  
                  <div className="signatures-section">
                    <div className="signature-box">
                      <p>Le Directeur des Études</p>
                      <div className="signature-line"></div>
                      <div className="signature-underline"></div>
                    </div>
                    <div className="signature-box">
                      <p>Le Professeur Principal</p>
                      <div className="signature-line"></div>
                      <div className="signature-underline"></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {!selectedStudent && (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>Aucun étudiant sélectionné</h3>
            <p>Sélectionnez un étudiant dans la liste déroulante pour afficher son bulletin</p>
          </div>
        )}
      </main>
    </div>
  );
}