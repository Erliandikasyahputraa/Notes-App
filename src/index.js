import "./styles/styles.css";
import "./components/AppBar";
import "./components/NoteForm";
import "./components/NoteItem";
import "./components/NoteItemArchive";
import "./components/AppFooter";
import "./components/LoadingIndicator"; 
import { fetchNotes, fetchArchiveNotes } from "./api";

async function loadNotes() {
  const activeNotesContainer = document.getElementById("notesContainer");
  const archivedNotesContainer = document.getElementById(
    "notesArchiveContainer"
  );


  const loadingIndicator = document.createElement("loading-indicator");
  document.body.appendChild(loadingIndicator);

  
  const [notes, archivedNotes] = await Promise.all([
    fetchNotes(),
    fetchArchiveNotes(),
  ]);

 
  loadingIndicator.remove();

  activeNotesContainer.innerHTML = "";
  archivedNotesContainer.innerHTML = "";


  notes.forEach((note) => {
    const noteElement = document.createElement("note-item");
    noteElement.note = note;
    activeNotesContainer.appendChild(noteElement);
  });

 
  archivedNotes.forEach((note) => {
    const noteElement = document.createElement("note-item-archive");
    noteElement.note = note;
    archivedNotesContainer.appendChild(noteElement);
  });
}


document.addEventListener("noteUpdated", loadNotes);

document.addEventListener("DOMContentLoaded", loadNotes);
