import { Router } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/db";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../lib/jwt";
import { z } from "zod";

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: { message: "User already exists", code: "USER_EXISTS" } });
    }

    // In a real study buddy app, we might just store password? 
    // The spec says bcrypt cost factor 12.
    // Note: The User model doesn't have a 'password' field in the spec schema provided.
    // I will add it via a migration if I were you, but I'll stick to the model provided.
    // WAIT, the model provided in the spec IS missing a password field.
    // I'll add a 'password' field to the User model in Prisma schema now.

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hash(password, 12),
      },
    });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ user, accessToken });
  } catch (err: any) {
    res.status(400).json({ error: err.errors || err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return res.status(401).json({ error: { message: "Invalid credentials", code: "INVALID_CREDENTIALS" } });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: { message: "Invalid credentials", code: "INVALID_CREDENTIALS" } });
    }
    
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ user, accessToken });
  } catch (err: any) {
    res.status(400).json({ error: err.errors || err.message });
  }
});

router.post("/refresh", async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  const decoded = verifyRefreshToken(token);
  if (!decoded) return res.sendStatus(403);

  const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
  if (!user) return res.sendStatus(403);

  const accessToken = generateAccessToken(user.id);
  res.json({ accessToken, user });
});

router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.sendStatus(204);
});

export default router;
