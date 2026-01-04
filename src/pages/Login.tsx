import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-xl font-semibold mb-6">Login</h2>
        <input
          placeholder="Email"
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-3 py-2 border rounded"
        />

        <button
          onClick={() => nav("/dashboard")}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg--blue-700"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
