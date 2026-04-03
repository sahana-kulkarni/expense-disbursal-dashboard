import axios from "axios";
import type { Expense } from "../types/expense";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://localhost:4000/api" : "");

const getToken = () => localStorage.getItem("token");

function getAuthHeaders() {
  const token = getToken();

  if (!token) {
    throw new Error("No auth token found");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export const fetchExpenses = async (): Promise<Expense[]> => {
  const res = await axios.get(`${API_BASE_URL}/expenses`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const createExpense = async (payload: {
  title: string;
  amount: number;
}): Promise<Expense> => {
  const res = await axios.post(`${API_BASE_URL}/expenses`, payload, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  return res.data;
};

export const updateExpenseStatus = async (id: string, status: string) => {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update expense status");
  }

  return response.json();
};
