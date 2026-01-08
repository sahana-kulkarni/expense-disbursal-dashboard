import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let expenses = [
  {
    id: "1",
    title: "Office Supplies",
    amount: 120,
    category: "Operations",
    status: "PENDING",
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    title: "Cloud Hosting",
    amount: 560,
    category: "IT",
    status: "APPROVED",
    createdAt: "2025-01-03",
  },
];

app.get("/api/expenses", (req, res) => {
  res.json(expenses);
});

app.patch("/api/expenses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const normalized = String(status).toUpperCase();

  const allowed = ["PENDING", "APPROVED", "REJECTED", "PAID"];
  if (!allowed.includes(normalized)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  const expense = expenses.find((e) => Number(e.id) === id);

  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  expense.status = normalized;
  res.json(expense);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
