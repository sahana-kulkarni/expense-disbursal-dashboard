type Props = {
  status: "PENDING" | "APPROVED" | "PAID";
};

const styles: Record<Props["status"], string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-blue-100 text-blue-800",
  PAID: "bg-green-100 text-green-800",
};

export default function StatusBadge({ status }: Props) {
  return (
    <span className={`x-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}
