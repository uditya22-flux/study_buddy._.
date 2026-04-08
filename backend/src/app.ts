import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";
// Import routes once created
import authRoutes from "./routes/auth";
import folderRoutes from "./routes/folders";
import noteRoutes from "./routes/notes";
import aiRoutes from "./routes/ai";
// import searchRoutes from "./routes/search";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/ai", aiRoutes);
// app.use("/api/search", searchRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

export default app;
