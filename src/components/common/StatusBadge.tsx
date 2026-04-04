type Props = {
  status: "PENDING" | "APPROVED" | "REJECTED";
};

const styles: Record<Props["status"], string> = {
  PENDING: "bg-amber-100 text-amber-700",
  APPROVED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-rose-100 text-rose-700",
};

export default function StatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-cs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}
