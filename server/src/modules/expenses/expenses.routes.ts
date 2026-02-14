import { Router } from "express";
import {
  createExpense,
  getExpenses,
  patchExpenseStatus,
  updateExpenseStatus,
} from "./expenses.controller";
import { requireAuth } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/role.middleware";

export const expensesRouter = Router();

expensesRouter.get("/", requireAuth, getExpenses);
expensesRouter.post("/", requireAuth, createExpense);
expensesRouter.patch("/:id", patchExpenseStatus);
expensesRouter.patch(
  "/:id/status",
  requireAuth,
  requireRole(["MANAGER", "ADMIN"]),
  updateExpenseStatus,
);
