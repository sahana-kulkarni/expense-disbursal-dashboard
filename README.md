# Enterprise Expense & Disbursal Management Dashboard

A frontend-focused dashboard that supports expense review workflows (Pending → Approved/Rejected) with a lightweight Node.js/Express API. Built to demonstrate production UI patterns such as server-state management, conditional actions, loading/error states, and clean architecture.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, React Router, React Query, Axios
- **Backend:** Node.js, Express, CORS

## Features

- Expense dashboard UI with table view
- Status workflow: **PENDING → APPROVED / REJECTED**
- Conditional rendering of actions based on status
- Server-state management using **React Query** with query invalidation after mutations
- Filters by status + pagination skeleton (UI)

## Screenshots

> Add 1–2 screenshots here (Dashboard + Expenses table)

- `screenshots/dashboard.png`
- `screenshots/expenses.png`

## Getting Started

### 1) Clone

```bash
git clone <your-repo-url>
cd expense-disbursal-dashboard
```

### 2) Run Backend (Express)

```bash
cd server
npm install
npm run dev
```

Backend runs on: http://localhost:4000

### 3) Run Frontend (Vite)

```bash
cd expense-disbursal-dashboard
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

### API Endpoints

- GET /api/expenses – fetch all expenses
- PATCH /api/expenses/:id – update expense status
  Body:

```json
{ "status": "APPROVED" }
```

---

## Notes

- Backend uses in-memory data storage for simplicity.
- The project is designed to highlight frontend architecture and workflow handling.
- Persistent storage, authentication, and server-side pagination are intentionally out of scope.

---

## Why This Project

This project was built to demonstrate real-world frontend engineering practices, including:

- Clean component and folder architecture
- Clear separation of server state and UI state
- Controlled UI workflows based on business rules
- Robust REST API integration with proper loading and error handling
