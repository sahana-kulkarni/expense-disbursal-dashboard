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
      },
    });
  },

  updateStatus(id: string, status: Status) {
    const row = db.find((e) => e.id === id);
    if (!row) return null;
    row.status = status;
    return row;
  },
};
