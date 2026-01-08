export type ExpenseStatus = "PENDING" | "APPROVED" | "PAID" | "REJECTED";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  status: ExpenseStatus;
  createdAt: string;
}
