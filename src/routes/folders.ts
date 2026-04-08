import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { buildFolderTree, createFolder, updateFolder, deleteFolder } from "../services/folderService";
import { z } from "zod";

const router = Router();

router.use(authMiddleware);

router.get("/tree", async (req: AuthRequest, res) => {
  try {
    const tree = await buildFolderTree(req.userId!);
    res.json(tree);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

const folderSchema = z.object({
  name: z.string().min(1),
  color: z.string().optional(),
  icon: z.string().optional(),
  parentId: z.string().nullable().optional(),
});

router.post("/", async (req: AuthRequest, res) => {
  try {
    const data = folderSchema.parse(req.body);
    const folder = await createFolder({ ...data, userId: req.userId! });
    res.status(201).json(folder);
  } catch (err: any) {
    res.status(400).json({ error: err.errors || err.message });
  }
});

router.patch("/:id", async (req: AuthRequest, res) => {
  try {
    const id = req.params.id as string;
    const folder = await updateFolder(id, req.userId!, req.body);
    res.json(folder);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req: AuthRequest, res) => {
  try {
    const id = req.params.id as string;
    await deleteFolder(id, req.userId!);
    res.sendStatus(204);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
