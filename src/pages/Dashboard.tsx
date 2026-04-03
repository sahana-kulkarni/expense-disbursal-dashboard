import AppLayout from "../components/layout/AppLayout";
import { useExpenses } from "../hooks/useExpenses";

export default function Dashboard() {
  const { data = [], isLoading, error } = useExpenses();

  const totalExpenses = data.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingCount = data.filter(
    (expense) => expense.status === "PENDING",
  ).length;
  const approvedTotal = data
    .filter((expense) => expense.status === "APPROVED")
    .reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-600">
            Summary of your expense activity.
          </p>
        </div>

        {isLoading && <p>Loading dashboard...</p>}
        {error && <p className="text-red-600">Failed to load dashboard</p>}

        {!isLoading && !error && (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-500">Total Expenses</p>
              <p className="mt-2 text-2xl font-semibold">
                ${totalExpenses.toFixed(2)}
              </p>
            </div>

            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-500">Pending Expenses</p>
              <p className="mt-2 text-2xl font-semibold">{pendingCount}</p>
            </div>

            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-500">Approved Total</p>
              <p className="mt-2 text-2xl font-semibold">
                ${approvedTotal.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
