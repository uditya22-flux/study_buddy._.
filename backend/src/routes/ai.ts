import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import prisma from "../config/db";
import { buildFolderTree } from "../services/folderService";
import { getGroqChatStream } from "../services/aiService";

const router = Router();

router.use(authMiddleware);

router.post("/chat", async (req: AuthRequest, res) => {
  try {
    const { message, conversationHistory } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.userId! } });
    if (!user) return res.sendStatus(404);

    const folderTree = await buildFolderTree(user.id);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await getGroqChatStream(user.name, folderTree, [
      ...conversationHistory,
      { role: "user", content: message }
    ]);

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err: any) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    } else {
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
      res.end();
    }
  }
});

export default router;
