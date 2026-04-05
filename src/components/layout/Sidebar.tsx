import { CreditCard, LayoutDashboard, Wallet } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Expenses",
    to: "/expenses",
    icon: Wallet,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen flex-col bg-white">
      <div className="border-b border-slate-200 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
            <CreditCard className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Finance Suite
            </p>
            <h2 className="text-base font-semibold tracking-tight text-slate-900">
              ExpenseFlow
            </h2>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <p className="px-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
          Navigation
        </p>

        <nav className="mt-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  ].join(" ")
                }
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-slate-200 px-4 py-4">
        <div className="rounded-2xl bg-slate-50 px-4 py-4">
          <p className="text-sm font-medium text-slate-900">Expense overview</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Manage submissions, review approvals, and monitor expense activity
            in one place.
          </p>
        </div>
      </div>
    </aside>
  );
}
