import type { Request, Response } from "express";
import { expensesService } from "./expenses.service";
import { AuthedRequest } from "../../types/auth";

export async function getExpenses(_req: AuthedRequest, res: Response) {
  const userId = _req.user?.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const rows = await expensesService.list(userId);
  return res.json(rows);
}

export function patchExpenseStatus(req: Request, res: Response) {
  const id = req.params.id;
  const status = req.body?.status;

  if (!status) return res.status(400).json({ message: "status is required" });

  const updated = expensesService.updateStatus(id.toString(), status);
  if (!updated) return res.status(404).json({ message: "Expense not found" });

  return res.json(updated);
}
