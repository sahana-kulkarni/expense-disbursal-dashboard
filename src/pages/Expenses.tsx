import ExpenseTable from "../components/expenses/ExpenseTable";
import AppLayout from "../components/layout/AppLayout";

export default function Expenses() {
  return (
    <AppLayout>
      <h2 className="text-2xl font-semibold mb-4">Expenses</h2>
      <ExpenseTable />
    </AppLayout>
  );
}
