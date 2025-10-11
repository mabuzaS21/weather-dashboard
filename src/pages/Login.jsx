import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CARD_MAX_WIDTH = 430;
const HEADER_HEIGHT = 56;
const INPUT_MAX_WIDTH = 360;

export default function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (username.trim() === "") {
      setError("Please enter your name!...");
      return;
    } 
    localStorage.setItem("weatherAppUser", username.trim());
    navigate("/dashboard");
  }; 

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background: "linear-gradient(to bottom, #dfeffe, #cfe7ff)",
        color: "#0f172a",
      }}
    >
      <header
        style={{
          height: HEADER_HEIGHT,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          background: "#38bdf8",
          borderBottom: "1px solid rgba(15,23,42,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>
            Weather Dashboard
          </span>
          <span aria-hidden="true" style={{ fontSize: 26, lineHeight: 1 }}>
            🌤️
          </span>
        </div>
      </header>

      <div
        style={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          display: "grid",
          placeItems: "center",
          padding: "16px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: CARD_MAX_WIDTH,
            background: "#fff",
            borderRadius: 18,
            boxShadow:
              "inset 0 1px 0 rgba(0,0,0,0.035), 0 16px 36px rgba(0,0,0,0.14)",
            padding: 28,
          }}
        >
          <h2
            style={{
              margin: 0,
              marginBottom: 10,
              textAlign: "center",
              color: "#1d4ed8",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            Welcome..
          </h2>

          <p
            style={{
              margin: 0,
              textAlign: "center",
              fontSize: 14,
              color: "#475569",
              lineHeight: 1.5,
              marginBottom: 14,
            }}
          >
            Your Local Weather — Fast, Accurate, and Beautiful.
            <br />
            Know the weather before you step outside.
          </p>

          <form onSubmit={handleSubmit} style={{ marginTop: 6 }}>
            <div style={{ maxWidth: INPUT_MAX_WIDTH, margin: "0 auto" }}>
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  fontSize: 15,
                  color: "#334155",
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                Your name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError("");
                }}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "1px solid",
                  borderColor: error ? "#ef4444" : "#cbd5e1",
                  outline: "none",
                  fontSize: 16,
                  background: "#ffffff",
                }}
                aria-invalid={Boolean(error)}
              />

              {error && (
                <p
                  style={{
                    marginTop: 8,
                    textAlign: "center",
                    color: "#dc2626",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onFocus={() => setIsHover(true)}
                onBlur={() => setIsHover(false)}
                onMouseDown={(e) =>
                  (e.currentTarget.style.transform = "translateY(1px)")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
                style={{
                  marginTop: 16,
                  width: "100%",
                  background: isHover ? "black" : "#0b74b3", 
                  color: "#fff",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "none",
                  fontSize: 16,
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 6px 14px rgba(11,116,179,0.35)",
                  transition: "background 140ms ease, transform 120ms ease",
                }}
              >
                Go to Dashboard →
              </button>

              <p
                style={{
                  marginTop: 10,
                  textAlign: "right",
                  fontSize: 11,
                  color: "#64748b",
                }}
              >
                weather
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
