import { useState } from "react";
import { useExpenses } from "../../hooks/useExpenses";
import StatusBadge from "../common/StatusBadge";
import Loader from "../common/Loader";
import ExpenseFilters from "./ExpenseFilters";

export default function ExpenseTable() {
  const { data, isLoading, error } = useExpenses();

  const [status, setStatus] = useState("");

  const filtered = status ? data?.filter((e) => e.status === status) : data;

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500">Failed to load expenses</p>;

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
            </tr>
          </thead>
          <tbody>
            {filtered?.map((exp) => (
              <tr key={exp.id} className="border-t">
                <td className="p-3">{exp.title}</td>
                <td className="p-3">{exp.category}</td>
                <td className="=p-3">{exp.amount}</td>
                <td className="p-3">
                  <StatusBadge status={exp.status} />
                </td>
                <td className="p-3">{exp.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end gap-2 p-3 border-t">
          <button className="px-3 py-1 border rounded">Prev</button>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </>
  );
}
