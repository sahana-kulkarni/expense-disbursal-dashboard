import { useState } from "react";
import { useExpenses } from "../../hooks/useExpenses";
import StatusBadge from "../common/StatusBadge";
import Loader from "../common/Loader";
import ExpenseFilters from "./ExpenseFilters";
import { updateExpenseStatus } from "../../api/expenseApi";
import { useQueryClient } from "@tanstack/react-query";

export default function ExpenseTable() {
  const queryClient = useQueryClient();
  const { data, isLoading, error: expenseError } = useExpenses();

  const [status, setStatus] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const filtered = status ? data?.filter((e) => e.status === status) : data;

  const handleStatusChange = async (
    id: string,
    status: "APPROVED" | "REJECTED",
  ) => {
    try {
      setLoadingId(id);
      setError("");

      await updateExpenseStatus(id, status);

      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    } catch {
      setError("Unable to update status");
    } finally {
      setLoadingId(null);
    }
  };

  if (isLoading) return <Loader />;
  if (expenseError)
    return <p className="text-red-500">Failed to load expenses</p>;

  return (
    <>
      <ExpenseFilters onFilter={setStatus} />
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered?.map((exp) => (
              <tr key={exp.id} className="border-t">
                <td className="p-3">{exp.title}</td>
                <td className="p-3">{exp.category}</td>
                <td className="p-3">{exp.amount}</td>
                <td className="p-3">
                  <StatusBadge status={exp.status} />
                </td>
                <td className="p-3">{exp.createdAt}</td>
                <td className="p-3 flex gap-2">
                  {exp.status === "PENDING" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(exp.id, "APPROVED")}
                        disabled={loadingId === exp.id}
                        className="px-3 py-1 text-xs bg-green-600 text-white rounded disabled:opacity-50"
                      >
                        {loadingId === exp.id ? "Updating..." : "Approve"}
                      </button>

                      <button
                        onClick={() => handleStatusChange(exp.id, "REJECTED")}
                        disabled={loadingId === exp.id}
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end gap-2 p-3 border-t">
          <button className="px-3 py-1 border rounded">Prev</button>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </>
  );
}
