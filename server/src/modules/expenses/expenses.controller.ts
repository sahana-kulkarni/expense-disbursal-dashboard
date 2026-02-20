import type { Response } from "express";
import type { AuthedRequest } from "../../types/auth";
import { expensesService } from "./expenses.service";

export async function getExpenses(req: AuthedRequest, res: Response) {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const rows = await expensesService.list(userId);
  return res.json(rows);
}

export async function createExpense(req: AuthedRequest, res: Response) {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const { title, amount } = req.body;

  if (!title || typeof title !== "string")
    return res.status(400).json({ message: "Title is required" });

  if (!amount || typeof amount !== "number")
    return res.status(400).json({ message: "Amount is required" });

  const expense = await expensesService.create(userId, title, amount);
  return res.json(expense);
}

export async function updateExpenseStatus(req: AuthedRequest, res: Response) {
  const actorId = req.user?.userId;
  if (!actorId) return res.status(401).json({ message: "Unauthorized" });

  const expenseId = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;
  const { status, reason } = req.body;

  if (!status) return res.status(400).json({ message: "Status is required" });

  if (!["APPROVED", "REJECTED"].includes(status)) {
    return res.status(400).json({ message: "Invalid status transition" });
  }

  const updated = await expensesService.updateStatus(
    expenseId,
    actorId,
    status,
    reason,
  );

  if (!updated) return res.status(404).json({ message: "Expense not found" });

  return res.json(updated);
}

export async function getExpenseAudits(req: AuthedRequest, res: Response) {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const expenseId = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

  if (user.role === "USER") {
    const expense = await expensesService.getExpenseById(expenseId);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    if (expense.userId !== user.userId)
      return res.status(403).json({ message: "Forbidden" });
  }

  const audits = await expensesService.getAudits(expenseId);
  return res.json(audits);
}
