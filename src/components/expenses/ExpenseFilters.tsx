type Props = {
  onFilter: (status: string) => void;
};

export default function ExpenseFilters({ onFilter }: Props) {
  return (
    <div className="flex gap-4 mb-4">
      <select
        className="border px-3 py-2 rounded"
        onChange={(e) => onFilter(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="PENDING">Pending</option>
        <option value="APPROVED">Approved</option>
        <option value="PAID">Paid</option>
        <option value="REJECTED">Rejected</option>
      </select>
    </div>
  );
}
