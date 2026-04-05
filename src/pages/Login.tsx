import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard, ShieldCheck, TrendingUp } from "lucide-react";
import { login } from "../api/authApi";

export default function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    try {
      setErr("");
      setIsSubmitting(true);

      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      nav("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch {
      setErr("Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden bg-slate-900 lg:flex lg:flex-col lg:justify-between lg:px-12 lg:py-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Finance Suite
              </p>
              <h1 className="text-lg font-semibold text-white">ExpenseFlow</h1>
            </div>
          </div>

          <div className="max-w-md">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white">
              Modern expense workflows for teams that need clarity and control.
            </h2>
            <p className="mt-5 text-sm leading-6 text-slate-300">
              Track submissions, monitor approvals, and manage expense activity
              in a dashboard designed for real business workflows.
            </p>

            <div className="mt-10 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="text-sm font-medium text-white">
                      Secure access
                    </p>
                    <p className="text-xs text-slate-300">
                      Protected login and role-based workflows.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-white">
                      Live financial visibility
                    </p>
                    <p className="text-xs text-slate-300">
                      Dashboard summaries stay synced with expense activity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Built for internal finance and operations teams.
          </p>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
              <div className="mb-8">
                <p className="text-sm font-medium text-slate-500">
                  Welcome back
                </p>
                <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Access your dashboard and manage expense activity from one
                  place.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {err && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {err}
                  </div>
                )}

                <button
                  onClick={onSubmit}
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-slate-600">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
