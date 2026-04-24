import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // GET notes
  const fetchNotes = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/notes");

    setNotes(res.data.data || res.data);
    console.log(res.data);
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

  // ADD note
 const addNote = async () => {
  try {
    await axios.post("http://localhost:8000/api/notes", {
      title,
      content,
    });

    setTitle("");
    setContent("");
    fetchNotes();
  } catch (error) {
    console.error("Error adding note:", error);
  }
};

  // DELETE note
  const deleteNote = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/api/notes/${id}`);
    fetchNotes();
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notes App</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <br />

      <button onClick={addNote}>Add Note</button>

      <hr />

      {notes.map((note) => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => deleteNote(note._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
