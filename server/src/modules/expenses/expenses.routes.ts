import { Router } from "express";
import {
  createExpense,
  getExpenseAudits,
  getExpenses,
  updateExpenseStatus,
} from "./expenses.controller";
import { requireAuth } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/role.middleware";

export const expensesRouter = Router();

// List & create are for any logged-in user
expensesRouter.get("/", requireAuth, getExpenses);
expensesRouter.post("/", requireAuth, createExpense);

// Status updates are manager/admin-only
expensesRouter.patch(
  "/:id/status",
  requireAuth,
  requireRole(["MANAGER", "ADMIN"]),
  updateExpenseStatus,
);

// Audit history (owner can view their own; manager/admin can view any)
expensesRouter.get("/:id/audits", requireAuth, getExpenseAudits);
