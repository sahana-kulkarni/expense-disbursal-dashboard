import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ExpenseTable from "../components/expenses/ExpenseTable";
import AppLayout from "../components/layout/AppLayout";
import { createExpense } from "../api/expenseApi";
import AddExpenseForm from "../components/expenses/AddExpenseForm";
import { useExpenses } from "../hooks/useExpenses";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

export default function Expenses() {
  const queryClient = useQueryClient();
  const { data = [] } = useExpenses();

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

  const summary = useMemo(() => {
    const totalAmount = data.reduce((sum, expense) => sum + expense.amount, 0);
    const pendingCount = data.filter(
      (expense) => expense.status === "PENDING",
    ).length;
    const approvedCount = data.filter(
      (expense) => expense.status === "APPROVED",
    ).length;
    const rejectedCount = data.filter(
      (expense) => expense.status === "REJECTED",
    ).length;

    return {
      totalAmount,
      pendingCount,
      approvedCount,
      rejectedCount,
      totalCount: data.length,
    };
  }, [data]);

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Expense Management
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
              Expenses
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Submit, review, and track expense activity in one place. Manage
              records efficiently with a clean workflow built for everyday use.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Total Submitted
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              {formatCurrency(summary.totalAmount)}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">All Expenses</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              {summary.totalCount}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Total records in the system
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Pending Review</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-amber-600">
              {summary.pendingCount}
            </p>
            <p className="mt-2 text-sm text-slate-500">Waiting for approval</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Approved</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-emerald-600">
              {summary.approvedCount}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Successfully approved expenses
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Rejected</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-rose-600">
              {summary.rejectedCount}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Expenses declined after review
            </p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-1">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Add New Expense
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Create a new expense entry to keep your records up to date.
              </p>
            </div>

            <AddExpenseForm
              onSubmit={handleCreateExpense}
              isSubmitting={isSubmitting}
            />

            {submitError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {submitError}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Expense Records
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Review submitted expenses and track their current approval
                  status.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  Total: {summary.totalCount}
                </span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                  Pending: {summary.pendingCount}
                </span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  Approved: {summary.approvedCount}
                </span>
                <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                  Rejected: {summary.rejectedCount}
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <ExpenseTable />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
