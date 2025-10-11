import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.trim() === "") {
      setError("Please enter your name!...");
      return;
    }

    localStorage.setItem("weatherAppUser", username.trim());
    navigate("/dashboard");
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#dfeffe] to-[#cfe7ff]">
      <NavBar />

      <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold text-blue-700">
            Welcome back
          </h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <label className="text-sm font-medium text-slate-700">
              Your name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 ${
                error
                  ? "border-red-500 focus:ring-red-300"
                  : "border-slate-300 focus:ring-blue-400"
              }`}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "login-error" : undefined}
            />

            {error && (
              <p
                id="login-error"
                className="text-center text-sm font-medium text-red-600"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
            >
              Go to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
