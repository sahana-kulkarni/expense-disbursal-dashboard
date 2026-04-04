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
      setError("Enter a valid amount");
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Expense Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          placeholder="e.g. Laptop reimbursement"
        />
        <p className="mt-1.5 text-xs text-slate-500">
          Use a clear title so the expense is easy to identify later.
        </p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Amount
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          placeholder="e.g. 120.50"
        />
        <p className="mt-1.5 text-xs text-slate-500">
          Enter the exact amount for this expense submission.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : "Create Expense"}
      </button>
    </form>
  );
}
