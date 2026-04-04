import AppLayout from "../components/layout/AppLayout";
import { useExpenses } from "../hooks/useExpenses";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

export default function Dashboard() {
  const { data = [], isLoading, error } = useExpenses();

  const totalExpenses = data.reduce((sum, expense) => sum + expense.amount, 0);

  const pendingCount = data.filter(
    (expense) => expense.status === "PENDING",
  ).length;

  const approvedTotal = data
    .filter((expense) => expense.status === "APPROVED")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const rejectedCount = data.filter(
    (expense) => expense.status === "REJECTED",
  ).length;

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-slate-500">
            Expense Management
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="max-w-2xl text-sm text-slate-500">
            Track expense activity, monitor approvals, and review financial
            submissions from one place.
          </p>
        </div>

        {isLoading && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                <div className="mt-4 h-8 w-24 animate-pulse rounded bg-slate-200" />
                <div className="mt-3 h-3 w-32 animate-pulse rounded bg-slate-100" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Failed to load dashboard data. Please try again.
          </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                  Total Expenses
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                  {formatCurrency(totalExpenses)}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Total value of all submitted expenses
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                  Pending Review
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-amber-600">
                  {pendingCount}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Expenses waiting for approval
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                  Approved Total
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-emerald-600">
                  {formatCurrency(approvedTotal)}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Value of approved expenses
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                  Rejected Expenses
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-rose-600">
                  {rejectedCount}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Expenses that were rejected
                </p>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Expense Overview
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Quick summary of current expense activity.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-500">
                      Total Records
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      {data.length}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-500">
                      Average Expense
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      {data.length > 0
                        ? formatCurrency(totalExpenses / data.length)
                        : formatCurrency(0)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-500">
                      Approval Rate
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      {data.length > 0
                        ? `${Math.round(
                            ((approvedTotal > 0
                              ? data.filter(
                                  (expense) => expense.status === "APPROVED",
                                ).length
                              : 0) /
                              data.length) *
                              100,
                          )}%`
                        : "0%"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">
                  Status Breakdown
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Current expense distribution by status.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className="text-sm font-medium text-slate-600">
                      Pending
                    </span>
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                      {pendingCount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className="text-sm font-medium text-slate-600">
                      Approved
                    </span>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {
                        data.filter((expense) => expense.status === "APPROVED")
                          .length
                      }
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className="text-sm font-medium text-slate-600">
                      Rejected
                    </span>
                    <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700">
                      {rejectedCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {data.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  No expenses yet
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Once you create expenses, your dashboard summary will appear
                  here.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}
