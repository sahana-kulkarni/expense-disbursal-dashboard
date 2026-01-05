import { useQuery } from "@tanstack/react-query";
import { fetchExpenses } from "../api/expenseApi";

export const useExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });
};
