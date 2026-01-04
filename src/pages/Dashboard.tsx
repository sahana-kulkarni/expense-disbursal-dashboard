import AppLayout from "../components/layout/AppLayout";

export default function Dashboard() {
  return (
    <AppLayout>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-xl font-bold">$12,450</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Pending Disbursables</p>
          <p className="text-xl font-bold">18</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Approved This Month</p>
          <p className="text-xl font-bold">$8,300</p>
        </div>
      </div>
    </AppLayout>
  );
}
