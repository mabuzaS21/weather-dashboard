import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("weatherAppUser");

  return (
    <nav className="w-full bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <button
          onClick={() => navigate("/")}
          className="text-sm font-semibold text-slate-800"
        >
          Weather Dashboard 🌤️
        </button>

        <div className="flex items-center gap-3">
          {user ? (
            <span className="text-xs text-slate-600">Welcome, {user}</span>
          ) : (
            <span className="text-xs text-slate-500">Please log in</span>
          )}
          <button
            onClick={() => navigate(user ? "/dashboard" : "/")}
            className="rounded-full bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
          >
            {user ? "Dashboard" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
}
