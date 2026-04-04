import { LogOut, Search } from "lucide-react";

export default function Navbar() {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const name = user?.email ? user.email.split("@")[0] : "User";
  const role = user?.role || "EMPLOYEE";

  return (
    <div className="flex h-16 items-center justify-between px-4 sm:px-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
          Workspace
        </p>
        <h1 className="text-lg font-semibold tracking-tight text-slate-900">
          Expense Management
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-500">Search</span>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadwo-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            {name.charAt(0).toUpperCase()}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-900">{name}</p>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {role}
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
