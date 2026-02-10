import type { Request, Response } from "express";
import { expensesService } from "./expenses.service";

export function getExpenses(_req: Request, res: Response) {
  return res.json(expensesService.list());
}

export function patchExpenseStatus(req: Request, res: Response) {
  const id = req.params.id;
  const status = req.body?.status;

  if (!status) return res.status(400).json({ message: "status is required" });

  const updated = expensesService.updateStatus(id.toString(), status);
  if (!updated) return res.status(404).json({ message: "Expense not found" });

  return res.json(updated);
}
