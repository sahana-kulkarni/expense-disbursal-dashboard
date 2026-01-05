import type { Expense } from "../types/expense";

const mockExpenses: Expense[] = [
  {
    id: "1",
    title: "Office Supplies",
    amount: 120,
    category: "Operation",
    status: "PENDING",
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    title: "Cloud Hosting",
    amount: 500,
    category: "IT",
    status: "APPROVED",
    createdAt: "2025-01-03",
  },
];

export const fetchExpenses = async (): Promise<Expense[]> => {
  return new Promise((res) => {
    setTimeout(() => res(mockExpenses), 500);
  });
};
