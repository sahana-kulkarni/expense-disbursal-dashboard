import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSucess("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await register(email, password);
      setSucess("Registration successful. Please log in.");
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-2 text-2xl font-semibold">Create Account</h1>
        <p className="mb-6 text-sm text-gray-600">
          Register to access the expense dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full rounded border px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full rounded border px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full rounded border px-3 py-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </div>

          {error && (
            <div className="rounded bg-red-100 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {sucess && (
            <div className="rounded bg-green-100 px-3 py-2 text-sm text-green-700">
              {sucess}
            </div>
          )}

          <button
            type="button"
            disabled={loading}
            className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="font-medium text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
