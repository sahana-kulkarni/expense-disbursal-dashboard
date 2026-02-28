import { Router } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../db/prisma";
import { env } from "../config/env";

export const devSeedRouter = Router();

devSeedRouter.post("/seed", async (req, res) => {
  const secret = req.header("x-seed-secret");

  if (!env.SEED_SECRET || secret !== env.SEED_SECRET) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const email = "manager@test.com";
  const password = "123456";
  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, password: hashed, role: "MANAGER" },
  });

  return res.json({ ok: true, email });
});
