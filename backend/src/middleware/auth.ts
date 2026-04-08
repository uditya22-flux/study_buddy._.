import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../lib/jwt";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: { message: "Unauthorized", code: "UNAUTHORIZED" } });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyAccessToken(token);

  if (!decoded) {
    return res.status(401).json({ error: { message: "Invalid or expired token", code: "INVALID_TOKEN" } });
  }

  req.userId = decoded.userId;
  next();
};
