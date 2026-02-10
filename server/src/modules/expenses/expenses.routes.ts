import { Router } from "express";
import { getExpenses, patchExpenseStatus } from "./expenses.controller";
import { requireAuth } from "../../middleware/auth.middleware";

export const expensesRouter = Router();

expensesRouter.get("/", requireAuth, getExpenses);
expensesRouter.patch("/:id", patchExpenseStatus);
