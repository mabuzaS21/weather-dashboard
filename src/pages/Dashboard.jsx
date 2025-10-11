import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { fetchForecast } from "../api/weather"; 

const HEADER_HEIGHT = 56;

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("weatherAppUser");
    if (!stored) navigate("/");
    else setUsername(stored);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("weatherAppUser");
    navigate("/");
  };

  const handleSearch = async (q) => {
    try {
      setError("");
      setLoading(true); 
      setCity(q);
      const res = await fetchForecast(q, 3);
      setData(res);
    } catch (e) {
      setError(e.message || "City not found");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const fmtHour = (ts) => {
    const d = new Date(ts.replace(" ", "T"));
    return d.toLocaleTimeString([], { hour: "2-digit" });
  };
  const fmtDay = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });
  };

  
  const nextHours = useMemo(() => {
    const hours = data?.forecast?.forecastday?.[0]?.hour || [];
    const now = new Date();
    const idx = Math.max(
      0,
      hours.findIndex((h) => new Date(h.time.replace(" ", "T")) >= now)
    );
    return hours.slice(idx, idx + 12);
  }, [data]);

  const days3 = data?.forecast?.forecastday || [];

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
      <NavBar />

      <main
        className="mx-auto max-w-6xl px-4"
        style={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          overflowY: "auto",
          paddingTop: 16,
          paddingBottom: 24,
        }}
      >
       
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
              Weather Dashboard
            </h1>
            <p className="text-sm text-slate-600">Welcome, {username}</p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500 px-4 py-2 text-white shadow-sm transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="mt-6">
          <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white/70 p-3 shadow-sm backdrop-blur ring-1 ring-slate-200">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        {error && (
          <p className="mt-4 text-center font-medium text-red-600">❌ {error}</p>
        )}
        {loading && (
          <p className="mt-4 text-center text-blue-600">Loading weather data…</p>
        )}

        
        {data && !loading && (
          <>

            <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <WeatherCard weather={data} />

              <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
                <h3 className="mb-5 text-lg font-semibold text-slate-800">
                  📌 More Info
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    ["UV Index", data.current.uv ?? "—"],
                    ["Feels Like", `${Math.round(data.current.feelslike_c)}°C`],
                    ["Visibility", `${data.current.vis_km} km`],
                    ["Pressure", `${data.current.pressure_mb} hPa`],
                    ["Cloudiness", `${data.current.cloud}%`],
                    ["Wind Dir", data.current.wind_dir],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition hover:shadow-sm"
                    >
                      <span className="text-slate-600">{label}</span>
                      <span className="font-semibold text-slate-800">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">
                  ⏰ Hourly 
                </h3>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-md ring-1 ring-slate-200">
                <div className="relative overflow-x-auto">
                  <div className="flex gap-4 scroll-px-4 snap-x">
                    {nextHours.map((h) => (
                      <div
                        key={h.time_epoch}
                        className="min-w-[92px] snap-start flex-shrink-0 rounded-xl border border-slate-200 bg-white p-3 text-center transition hover:-translate-y-0.5 hover:shadow"
                      >
                        <p className="text-[11px] text-slate-500">
                          {fmtHour(h.time)}
                        </p>
                        <img
                          src={h.condition.icon}
                          alt={h.condition.text}
                          className="mx-auto h-8 w-8"
                        />
                        <p className="mt-1 text-sm font-semibold">
                          {Math.round(h.temp_c)}°C
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <h3 className="mb-3 text-lg font-semibold text-slate-800">
                📅 Overview 
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {days3.map((d) => (
                  <div
                    key={d.date_epoch}
                    className="rounded-2xl bg-white p-5 text-center shadow-md ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <p className="text-sm text-slate-500">{fmtDay(d.date)}</p>
                    <img
                      src={d.day.condition.icon}
                      alt={d.day.condition.text}
                      className="mx-auto h-12 w-12"
                    />
                    <p className="mt-1 text-sm text-slate-600">
                      {d.day.condition.text}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
                      <span className="text-sm font-semibold">
                        {Math.round(d.day.maxtemp_c)}°
                      </span>
                      <span className="text-xs text-slate-500">/</span>
                      <span className="text-sm text-slate-600">
                        {Math.round(d.day.mintemp_c)}°
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
