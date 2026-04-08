import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { getNotesInFolder, getNoteById, createNote, updateNote, deleteNote } from "../services/noteService";

const router = Router();

router.use(authMiddleware);

router.get("/", async (req: AuthRequest, res) => {
  try {
    const { folderId } = req.query;
    if (!folderId) return res.status(400).json({ error: "folderId required" });
    const notes = await getNotesInFolder(folderId as string, req.userId!);
    res.json(notes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req: AuthRequest, res) => {
  try {
    const note = await getNoteById(req.params.id as string, req.userId!);
    if (!note) return res.sendStatus(404);
    res.json(note);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req: AuthRequest, res) => {
  try {
    const { title, folderId } = req.body;
    const note = await createNote({ title, folderId, userId: req.userId! });
    res.status(201).json(note);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.patch("/:id", async (req: AuthRequest, res) => {
  try {
    const id = req.params.id as string;
    await updateNote(id, req.userId!, req.body);
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req: AuthRequest, res) => {
  try {
    const id = req.params.id as string;
    await deleteNote(id, req.userId!);
    res.sendStatus(204);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
