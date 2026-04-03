import { useState } from "react";

type AddExpenseFormProps = {
  onSubmit: (values: { title: string; amount: number }) => Promise<void>;
  isSubmitting?: boolean;
};

export default function AddExpenseForm({
  onSubmit,
  isSubmitting = false,
}: AddExpenseFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const parsedAmount = Number(amount);

    //validations
    if (!title.trim()) {
      setError("Title is rerquired");
      return;
    }

    if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Enter a valid number");
      return;
    }

    await onSubmit({
      title: title.trim(),
      amount: parsedAmount,
    });

    //Clearing the form
    setTitle("");
    setAmount("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border bg-white p-4 shadow-sm"
    >
      <h2 className="mb-4 text-lg font-semibold">Add Expense</h2>

      <div className="mb-3">
        <label className="mb-1 block text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="e.g. Laptop reimbursement"
        />
      </div>

      <div className="mb-3">
        <label className="mb-1 block text-sm font-medium">Amount</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="e.g. 120.50"
        />
      </div>

      {error && (
        <div className="mb-3 rounded bg-red-100 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Create Expense"}
      </button>
    </form>
  );
}
