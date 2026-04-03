export type ExpenseStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  status: ExpenseStatus;
  createdAt: string;
}
