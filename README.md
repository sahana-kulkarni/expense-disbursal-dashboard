# Enterprise Expense & Disbursal Dashboard

A full-stack expense management system that simulates real-world financial workflows with role-based access, approval pipelines, and interactive dashboards.

🔗 Live Demo: https://expense-disbursal-dashboard.vercel.app  
🔗 Backend API: https://expense-disbursal-dashboard-1.onrender.com  

---

## Overview

This project is designed to mimic how organizations manage expenses, approvals, and financial tracking.

Users can:
- Register and log in
- Create and manage expenses via UI
- View real-time dashboard insights
- Approve or reject expenses based on roles

The system ensures a **clean separation of frontend, backend, and data layers**, making it scalable and production-ready.

---

## Features

### Authentication & Roles
- User registration & login
- Role-based access (User / Manager)
- Managers can approve/reject expenses

### Expense Management
- Create, update, and view expenses via UI
- Status flow: `PENDING → APPROVED / REJECTED`
- Dynamic UI actions based on status

### Dashboard
- Real-time summary of expenses
- Status-based insights (Approved, Pending, Rejected)
- Automatically updates when new expenses are added

### State Management
- Built using **React Query**
- Automatic refetch & cache invalidation after mutations
- Handles loading, error, and empty states gracefully

---

## Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS
- React Router
- TanStack React Query
- Axios

### Backend
- Node.js + Express
- REST APIs
- JWT Authentication (in progress / optional if not added)

### Database
- PostgreSQL (Neon / local setup)
- Prisma ORM

### Deployment
- Frontend: Vercel
- Backend: Render

---

## Screenshots

> Add 1–2 screenshots here (Dashboard + Expenses table)

- `screenshots/dashboard.png`
- `screenshots/expenses.png`

## ⚙️ Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/sahana-kulkarni/expense-disbursal-dashboard.git
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

- POST /api/auth/register
- POST /api/auth/login
- GET /api/expenses
- POST /api/expenses
- PATCH /api/expenses/:id/status

---

## Why This Project

Working in financial workflows at the courts, I wanted to build a system that reflects real-world expense handling, approvals, and data consistency challenges.

This project helped me strengthen:
- Full-stack development skills
- API design and integration
- State management and UI synchronization
