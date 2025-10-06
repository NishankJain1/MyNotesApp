import express from 'express';
import Note from '../models/Note.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// 📝 Create Note
router.post("/", verifyToken, async (req, res) => {
  try {
    const note = new Note({ ...req.body, user: req.user.id });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error creating note" });
  }
});

// 📋 Get All Notes (for logged-in user)
router.get("/", verifyToken, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});


export default router;