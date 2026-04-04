/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9eaff",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
        },
        surface: "#ffffff",
        page: "#f8fafc",
        border: "#e2e8f0",
        ink: "#0f172a",
        muted: "#64748b",
        success: "#16a34a",
        warning: "#d97706",
        danger: "#dc2626",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
};
