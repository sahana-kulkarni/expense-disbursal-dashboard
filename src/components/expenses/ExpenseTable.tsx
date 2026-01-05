import { useExpenses } from "../../hooks/useExpenses";

export default function ExpenseTable() {
  const { data, isLoading, error } = useExpenses();

  if (isLoading) return <p>Loading expenses...</p>;
  if (error) return <p className="text-red-500">Failed to load expenses</p>;

  return (
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
          {data?.map((exp) => (
            <tr key={exp.id} className="border-t">
              <td className="p-3">{exp.title}</td>
              <td className="p-3">{exp.category}</td>
              <td className="=p-3">{exp.amount}</td>
              <td className="p-3">
                <span className="px-2 py-1 rounded text-xs bg-gray-200">
                  {exp.status}
                </span>
              </td>
              <td className="p-3">{exp.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
