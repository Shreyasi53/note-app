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
  <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
    
    <h1 className="text-4xl font-bold mb-6">Notes App</h1>

    <div className="w-full max-w-md flex flex-col gap-3">
      <input
        className="p-2 rounded bg-gray-800 border border-gray-600"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="p-2 rounded bg-gray-800 border border-gray-600"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={addNote}
        className="bg-purple-600 hover:bg-purple-700 p-2 rounded"
      >
        Add Note
      </button>
    </div>

    <hr className="w-full max-w-md my-6 border-gray-600" />

    <div className="w-full max-w-md">
      {notes.map((note) => (
        <div
          key={note._id}
          className="bg-gray-800 p-4 rounded mb-4 shadow"
        >
          <h3 className="text-xl font-semibold">{note.title}</h3>
          <p className="text-gray-300">{note.content}</p>

          <button
            onClick={() => deleteNote(note._id)}
            className="mt-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
);
}

export default App;
