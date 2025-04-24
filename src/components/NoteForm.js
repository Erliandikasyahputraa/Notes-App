import { addNote } from "../api"; 

class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <form id="noteForm">
                <input type="text" id="title" placeholder="Title" required />
                <textarea id="body" placeholder="Write your note here..." required></textarea>
                <button type="submit" id="submitBtn">Add Note</button>
            </form>
        `;

    this.querySelector("#noteForm").addEventListener(
      "submit",
      this.addNote.bind(this)
    );
  }

  async addNote(event) {
    event.preventDefault();
    const title = this.querySelector("#title").value.trim();
    const body = this.querySelector("#body").value.trim();

    if (!title || !body) {
      Swal.fire({
        icon: "warning",
        title: "Warning!",
        text: "Title and body cannot be empty.",
      });
      return;
    }

  
    const newNote = await addNote(title, body);

    if (newNote) {
      
      const noteElement = document.createElement("note-item");
      noteElement.note = newNote;
      document.getElementById("notesContainer").appendChild(noteElement);

      this.querySelector("#noteForm").reset();
    }
  }
}

customElements.define("note-form", NoteForm);
