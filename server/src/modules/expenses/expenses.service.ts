import { prisma } from "../../db/prisma";

type Status = "PENDING" | "APPROVED" | "REJECTED";

type Expense = {
  id: string;
  title: string;
  amount: number;
  status: Status;
};

const db: Expense[] = [
  { id: "1", title: "Flight", amount: 420, status: "PENDING" },
  { id: "2", title: "Hotel", amount: 780, status: "APPROVED" },
];

export const expensesService = {
  async list(userId: string) {
    return prisma.expense.findMany({
      where: { userId },
    });
  },

  async create(userId: string, title: string, amount: number) {
    return prisma.expense.create({
      data: {
        title,
        amount,
        userId,
        status: "PENDING",
      },
    });
  },

  async updateStatus(expenseId: string, status: "APPROVED" | "REJECTED") {
    const expense = await prisma.expense.findUnique({
      where: { id: expenseId },
    });
    if (!expense) return null;

    if (expense.status !== "PENDING") {
      throw new Error("Only PENDING expenses can be updated");
    }

    return prisma.expense.update({
      where: { id: expenseId },
      data: { status },
    });
  },
};
