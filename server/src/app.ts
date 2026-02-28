import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { errorMiddleware } from "./middleware/error.middleware";
import { expensesRouter } from "./modules/expenses/expenses.routes";
import { authRouter } from "./modules/auth/auth.routes";
import { devSeedRouter } from "./routes/dev.seed.route";

export function createApp() {
  const app = express();

  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json());

  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.use("/api/auth", authRouter);

  app.use("/api/expenses", expensesRouter);

  if (env.SEED_SECRET) {
    app.use("/api/dev", devSeedRouter);
  }

  app.use(errorMiddleware);
  return app;
}
