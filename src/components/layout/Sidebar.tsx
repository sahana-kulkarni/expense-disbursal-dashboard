import { NavLink } from "react-router-dom";

const linkCls =
  "block px-4 py-2 rounded text-sm font-medium text-gray-700 hover:bg-gray-100";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-50 border-r h-screen p-4">
      <nav className="space-y-2">
        <NavLink to="/dashboard" className={linkCls}>
          Dashboard
        </NavLink>
        <NavLink to="/expenses" className={linkCls}>
          Expenses
        </NavLink>
      </nav>
    </aside>
  );
}
