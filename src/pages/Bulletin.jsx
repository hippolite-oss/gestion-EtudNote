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

  // Données d'exemple (à remplacer par backend)
  const students = [
    { id: "1", name: "Hugues Medegnon", classe: "3ème A", annee: "2025" },
    { id: "2", name: "Jean Dupont", classe: "3ème B", annee: "2025" },
  ];

  const notesData = {
    "1": [
      { matiere: "Maths", note: 16, coef: 4 },
      { matiere: "Physique", note: 14, coef: 3 },
      { matiere: "SVT", note: 13, coef: 2 },
    ],
    "2": [
      { matiere: "Maths", note: 12, coef: 4 },
      { matiere: "Physique", note: 10, coef: 3 },
    ],
  };

  const handleSelectStudent = (e) => {
    setSelectedStudent(e.target.value);
  };

  const student = students.find((s) => s.id === selectedStudent);
  const notes = selectedStudent ? notesData[selectedStudent] || [] : [];
  const moyenne =
    notes.length > 0
      ? (
          notes.reduce((acc, n) => acc + n.note * n.coef, 0) /
          notes.reduce((acc, n) => acc + n.coef, 0)
        ).toFixed(2)
      : null;

  const mention = moyenne
    ? moyenne >= 16
      ? "Très Bien"
      : moyenne >= 14
      ? "Bien"
      : moyenne >= 12
      ? "Assez Bien"
      : "Passable"
    : "";

  const exportPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
      pdf.save(`${student.name}_bulletin.pdf`);
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div className="bulletin-page">
        <h1>Bulletin de Notes</h1>

        <div className="select-box">
          <label>Choisir un étudiant :</label>
          <select onChange={handleSelectStudent} value={selectedStudent}>
            <option value="">-- Sélectionner --</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.classe})
              </option>
            ))}
          </select>
        </div>

        {selectedStudent && (
          <>
            {/* Boutons actions */}
            <div className="bulletin-actions">
              <button className="btn dashboard-btn" onClick={() => navigate("/dashboard")}>
                🔙 Retour au Dashboard
              </button>
              <button className="btn export-btn" onClick={exportPDF}>
                📄 Exporter PDF
              </button>
            </div>

            {/* Bulletin */}
            <div className="bulletin-card" ref={pdfRef}>
              {/* En-tête scolaire */}
              <div className="bulletin-header">
                <div className="logo">🏫 Lycée Coulibaly</div>
                <div>
                  <h2>Bulletin Scolaire</h2>
                  <p>Année : {student.annee}</p>
                  <p>Classe : {student.classe}</p>
                </div>
              </div>

              <div className="student-info">
                <p><strong>Étudiant :</strong> {student.name}</p>
              </div>

              {/* Tableau des notes */}
              <table className="bulletin-table">
                <thead>
                  <tr>
                    <th>Matière</th>
                    <th>Note</th>
                    <th>Coefficient</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((n, i) => (
                    <tr key={i}>
                      <td>{n.matiere}</td>
                      <td>{n.note}</td>
                      <td>{n.coef}</td>
                      <td>{(n.note * n.coef).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="bulletin-footer">
                <p><strong>Moyenne Générale :</strong> {moyenne}</p>
                <p><strong>Mention :</strong> {mention}</p>
                <div className="signature">
                  <p>Signature du Directeur</p>
                  <div className="sign-box"></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
