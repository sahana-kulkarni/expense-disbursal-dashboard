import type { Request, Response } from "express";
import { authService } from "./auth.service";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await authService.register(email, password);
  res.status(201).json(user);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await authService.login(email, password);

  if (!result) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json(result);
}
