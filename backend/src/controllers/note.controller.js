import Note from "../models/note.model.js";

// CREATE
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({ title, content });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedData = {};
    if (title) updatedData.title = title;
    if (content) updatedData.content = content;

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};