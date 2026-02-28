import { useQuery } from "@tanstack/react-query";
import { fetchExpenses } from "../api/expenseApi";

export const useExpenses = () => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
    enabled: !!token,
  });
};
