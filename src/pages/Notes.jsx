import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./Notes.css";

export default function Notes() {
  const [student, setStudent] = useState("");
  const [matiere, setMatiere] = useState("");
  const [note, setNote] = useState("");
  const [notesList, setNotesList] = useState([]);

  // Données fictives
  const students = [
    { id: 1, name: "Hugues Medegnon" },
    { id: 2, name: "Jean Dupont" },
  ];

  const matieres = [
    { id: 1, name: "Maths" },
    { id: 2, name: "Physique" },
    { id: 3, name: "SVT" },
  ];

  const handleAddNote = () => {
    if (!student || !matiere || !note) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const newNote = {
      id: Date.now(),
      student: students.find((s) => s.id === parseInt(student)).name,
      matiere: matieres.find((m) => m.id === parseInt(matiere)).name,
      note: parseFloat(note),
    };

    setNotesList([...notesList, newNote]);
    setStudent("");
    setMatiere("");
    setNote("");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div className="notes-page">
        <h1>Ajouter une Note</h1>

        <div className="form-block">
          <div className="form-group">
            <label>Étudiant :</label>
            <select value={student} onChange={(e) => setStudent(e.target.value)}>
              <option value="">-- Sélectionner --</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Matière :</label>
            <select value={matiere} onChange={(e) => setMatiere(e.target.value)}>
              <option value="">-- Sélectionner --</option>
              {matieres.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Note :</label>
            <input
              type="number"
              min="0"
              max="20"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Entrer la note"
            />
          </div>

          <button className="btn-add" onClick={handleAddNote}>
            Ajouter la Note
          </button>
        </div>

        {notesList.length > 0 && (
          <div className="notes-list">
            <h2>Notes enregistrées</h2>
            <table>
              <thead>
                <tr>
                  <th>Étudiant</th>
                  <th>Matière</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {notesList.map((n) => (
                  <tr key={n.id}>
                    <td>{n.student}</td>
                    <td>{n.matiere}</td>
                    <td>{n.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
