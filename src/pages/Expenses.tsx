import { useQueryClient } from "@tanstack/react-query";
import ExpenseTable from "../components/expenses/ExpenseTable";
import AppLayout from "../components/layout/AppLayout";
import { createExpense } from "../api/expenseApi";
import AddExpenseForm from "../components/expenses/AddExpenseForm";
import { useState } from "react";

export default function Expenses() {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleCreateExpense(values: {
    title: string;
    amount: number;
  }) {
    try {
      setIsSubmitting(true);
      setSubmitError("");

      await createExpense(values);

      await queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to create expense",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Expenses</h1>
          <p className="text-sm text-gray-600">
            Create and track your submitted expenses.
          </p>
        </div>

        <AddExpenseForm
          onSubmit={handleCreateExpense}
          isSubmitting={isSubmitting}
        />

        {submitError && (
          <div className="rounded bg-red-100 px-3 py-2 text-sm text-red-700">
            {submitError}
          </div>
        )}

        <ExpenseTable />
      </div>
    </AppLayout>
  );
}
