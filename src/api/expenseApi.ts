import axios from "axios";
import type { Expense } from "../types/expense";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

export const fetchExpenses = async (): Promise<Expense[]> => {
  const res = await axios.get(`${API_BASE_URL}/expenses`);
  return res.data;
};

export const updateExpenseStatus = async (
  id: string,
  status: string,
  token?: string,
) => {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update expense status");
  }

  return response.json();
};
