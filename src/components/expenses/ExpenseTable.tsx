import { useMemo, useState } from "react";
import { useExpenses } from "../../hooks/useExpenses";
import StatusBadge from "../common/StatusBadge";
import Loader from "../common/Loader";
import ExpenseFilters from "./ExpenseFilters";
import { updateExpenseStatus } from "../../api/expenseApi";
import { useQueryClient } from "@tanstack/react-query";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export default function ExpenseTable() {
  const queryClient = useQueryClient();
  const { data, isLoading, error: expenseError } = useExpenses();

  const [status, setStatus] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    return status ? data?.filter((expense) => expense.status === status) : data;
  }, [data, status]);

  const handleStatusChange = async (
    id: string,
    status: "APPROVED" | "REJECTED",
  ) => {
    try {
      setLoadingId(id);
      setError("");

      await updateExpenseStatus(id, status);

      await queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    } catch {
      setError("Unable to update status");
    } finally {
      setLoadingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border boder-slate-200 bg-white p-8 shadow-sm">
        <Loader />
      </div>
    );
  }
  if (expenseError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Failed to load expenses
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Expense List
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            View and Manage submitted expense records.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <ExpenseFilters onFilter={setStatus} />
        </div>
      </div>

      {error && (
        <div className="mx-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {filtered?.length === 0 ? (
        <div className="px-4 pb-6">
          <div className="rounded-2xl border border-dashed boder-slate-300 bg-slate-50 px-6 py-12 text-center">
            <h4 className="text-base font-semibold text-slate-900">
              No expenses found
            </h4>
            <p className="mt-2 text-sm text-slate-500">
              Try changing the filter or add a new expense to see records here.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="border-y border-slate-200 text-left">
                <th className="px-4 py-3 font-semibold text-slate-600">
                  Title
                </th>
                <th className="px-4 py-3 font-semibold text-slate-600">
                  Amount
                </th>
                <th className="px-4 py-3 font-semibold text-slate-600">
                  Status
                </th>
                <th className="px-4 py-3 font-semibold text-slate-600">
                  Created
                </th>
                <th className="px-4 py-3 font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered?.map((exp) => (
                <tr
                  key={exp.id}
                  className="border-b boder-slate-100 transition hover:bg-slate-50/70"
                >
                  <td className="px-4 py-4">
                    <div className="font-medium text-slate-900">
                      {exp.title}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      Expense ID: {exp.id.slice(0, 8)}
                    </div>
                  </td>

                  <td className="px-4 py-4 ffont-medium text-slate-900">
                    {formatCurrency(exp.amount)}
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={exp.status} />
                  </td>

                  <td className="px-4 py-4 text-slate-600">
                    {formatDate(exp.createdAt)}
                  </td>

                  <td className="px-4 py-4">
                    {exp.status === "PENDING" ? (
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleStatusChange(exp.id, "APPROVED")}
                          disabled={loadingId === exp.id}
                          className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {loadingId === exp.id ? "Updating..." : "Approve"}
                        </button>

                        <button
                          onClick={() => handleStatusChange(exp.id, "REJECTED")}
                          disabled={loadingId === exp.id}
                          className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xxs font-medium text-slate-400">
                        No actions available
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
