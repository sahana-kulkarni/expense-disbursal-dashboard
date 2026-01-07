import axios from "axios";
import type { Expense } from "../types/expense";

export const fetchExpenses = async (): Promise<Expense[]> => {
  const res = await axios.get("http://localhost:4000/api/expenses");
  return res.data;
};
