import express from "express";
import {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/note.controller.js";

const router = express.Router();

// GET all notes
router.get("/", getNotes);

// POST new note
router.post("/", createNote);

// DELETE note
router.delete("/:id", deleteNote);

// UPDATE note
router.put("/:id", updateNote);

export default router;