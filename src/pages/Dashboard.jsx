import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar"; 
import WeatherCard from "../components/WeatherCard";
import { fetchForecast } from "../api/weather";
import NavBar from "../components/NavBar";

const HEADER_HEIGHT = 56; 

export default function Dashboard() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("weatherAppUser");
    if (!storedUser) {
      navigate("/");
    } else {
      setUsername(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("weatherAppUser");
    navigate("/");
  };

  const handleSearch = async (searchedCity) => {
    try {
      setError("");
      setData(null);
      setCity(searchedCity);
      setLoading(true);
      const res = await fetchForecast(searchedCity, 3); 
      setData(res);
    } catch (err) {
      setError(err.message || "City not found");
    } finally {
      setLoading(false);
    }
  };

  const formatHour = (iso) => {
    const d = new Date(iso.replace(" ", "T"));
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDay = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });
  };

  const nextHours = (() => {
    if (!data?.forecast?.forecastday?.[0]?.hour) return [];
    const hours = data.forecast.forecastday[0].hour;
    const now = new Date();
    const startIndex = Math.max(
      0,
      hours.findIndex((h) => new Date(h.time.replace(" ", "T")) >= now)
    );
    return hours.slice(startIndex, startIndex + 12); 
  })();

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
        className="mx-auto max-w-6xl px-4 pb-12"
        style={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          overflowY: "auto",
          paddingTop: 16,
        }}
      >
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Weather Dashboard</h1>
            <p className="text-sm text-slate-600">Welcome, {username}</p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="mt-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">❌ {error}</p>
        )}
        {loading && (
          <p className="mt-4 text-center text-blue-600">Loading weather data…</p>
        )}


        {data && !loading && (
          <>

            <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <WeatherCard weather={data} />

              <div className="rounded-2xl bg-white p-6 shadow-md">
                <h3 className="mb-4 text-lg font-semibold text-slate-800">📌 More Info</h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-2">
                    <span>UV Index</span>
                    <span className="font-semibold">{data.current.uv ?? "—"}</span>
                  </li>
                  <li className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-2">
                    <span>Feels Like</span>
                    <span className="font-semibold">
                      {Math.round(data.current.feelslike_c)}°C
                    </span>
                  </li>
                  <li className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-2">
                    <span>Visibility</span>
                    <span className="font-semibold">{data.current.vis_km} km</span>
                  </li>
                  <li className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-2">
                    <span>Pressure</span>
                    <span className="font-semibold">{data.current.pressure_mb} hPa</span>
                  </li>
                  <li className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-2">
                    <span>Cloudiness</span>
                    <span className="font-semibold">{data.current.cloud}%</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mt-8">
              <h3 className="mb-3 text-lg font-semibold text-slate-800">
                ⏰ Hourly 
              </h3>

              <div className="overflow-x-auto">
                <div className="flex gap-3 min-w-full">
                  {nextHours.map((h) => (
                    <div
                      key={h.time_epoch}
                      className="min-w-[96px] flex-shrink-0 rounded-xl bg-white p-3 text-center shadow"
                    >
                      <p className="text-xs text-slate-500">{formatHour(h.time)}</p>
                      <img
                        src={h.condition.icon}
                        alt={h.condition.text}
                        className="mx-auto h-8 w-8"
                      />
                      <p className="mt-1 text-sm font-semibold">{Math.round(h.temp_c)}°C</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-8">
              <h3 className="mb-3 text-lg font-semibold text-slate-800">📅 Overview </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {days3.map((d) => (
                  <div
                    key={d.date_epoch}
                    className="rounded-2xl bg-white p-4 text-center shadow"
                  >
                    <p className="text-sm text-slate-500">{formatDay(d.date)}</p>
                    <img
                      src={d.day.condition.icon}
                      alt={d.day.condition.text}
                      className="mx-auto h-12 w-12"
                    />
                    <p className="mt-2 text-sm text-slate-600">{d.day.condition.text}</p>
                    <p className="mt-1 text-base font-semibold">
                      {Math.round(d.day.maxtemp_c)}° / {Math.round(d.day.mintemp_c)}°
                    </p>
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
