import { prisma } from "../../db/prisma";

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

  async updateStatus(
    expenseId: string,
    actorId: string,
    toStatus: "APPROVED" | "REJECTED",
    reason?: string,
  ) {
    const expense = await prisma.expense.findUnique({
      where: { id: expenseId },
    });
    if (!expense) return null;

    if (expense.status !== "PENDING") {
      throw new Error("Only PENDING expenses can be updated");
    }

    const fromStatus = expense.status;

    const [updated] = await prisma.$transaction([
      prisma.expense.update({
        where: { id: expenseId },
        data: { status: toStatus },
      }),
      prisma.expenseAudit.create({
        data: {
          expenseId,
          actorId,
          fromStatus,
          toStatus,
          reason,
        },
      }),
    ]);

    return updated;
  },

  async getAudits(expenseId: string) {
    return prisma.expenseAudit.findMany({
      where: { expenseId },
      orderBy: { createdAt: "desc" },
      include: {
        actor: { select: { id: true, email: true, role: true } },
      },
    });
  },

  async getExpenseById(expenseId: string) {
    return prisma.expense.findUnique({
      where: { id: expenseId },
    });
  },
};
