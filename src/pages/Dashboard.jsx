import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { fetchWeather } from "../api/weather";

export default function Dashboard() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const u = localStorage.getItem("weatherAppUser");
    if (!u) return nav("/");
    setUsername(u);
  }, [nav]);

  const handleLogout = () => {
    localStorage.removeItem("weatherAppUser");
    nav("/");
  };

  const handleSearch = async (query) => {
    try {
      setError("");
      setLoading(true);
      const data = await fetchWeather(query);
      setWeather(data);
    } catch (e) {
      setWeather(null);
      setError(e.message || "City not found");
    } finally { 
      setLoading(false);
    }
  };

  const hours = weather?.forecast?.forecastday?.[0]?.hour?.slice(0, 12) ?? [];
  const days = weather?.forecast?.forecastday ?? [];

  return (
    <div
      className="min-h-screen text-slate-800"
      style={{
        position: "fixed",
        inset: 0,
        overflow: "auto",
        background: "linear-gradient(to bottom, #dfeffe, #cfe7ff)", 
      }}
    >
     
      <div className="sticky top-0 z-10 bg-sky-500/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-white text-lg font-bold">Weather Dashboard</span>
            <span aria-hidden className="text-2xl">🌤️</span>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 text-white text-sm">
            Welcome{username ? `, ${username}` : ""}
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/30"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6">
        <SearchBar onSearch={handleSearch} placeholder="Enter city name…" compact />

        {error && (
          <p className="mx-auto mt-3 w-full max-w-sm rounded-md bg-red-50 px-3 py-2 text-center text-sm font-medium text-red-600 ring-1 ring-red-200">
            ❌ {error}
          </p>
        )}

        {loading && (
          <p className="mx-auto mt-6 w-full max-w-sm text-center text-sky-700">
            Loading weather data…
          </p>
        )}

        {weather && !loading && (
          <>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="mx-auto max-w-xl">
                  <WeatherCard weather={weather} />
                </div>
              </div>

              <div className="lg:col-span-7">
                <h3 className="mb-3 text-center text-sm font-bold uppercase tracking-wide text-slate-600">
                  Hourly Forecast <span aria-hidden>🌤️</span>
                </h3>

                <div
                  className="mx-auto overflow-x-auto no-scrollbar"
                  style={{
                    maxWidth: 980,
                    borderRadius: 22,
                    padding: "14px 16px",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.75), rgba(255,255,255,0.55))",
                    boxShadow:
                      "inset 0 0 40px rgba(0,0,0,0.10), 0 12px 26px rgba(0,0,0,0.10)",
                  }}
                >
                  
                  <div className="flex items-stretch gap-4">
                    {hours.map((h) => (
                      <div
                        key={h.time}
                        className="flex min-w-[112px] flex-col items-center justify-between rounded-2xl bg-white/85 px-4 py-3 text-center shadow"
                        style={{
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.65), 0 6px 14px rgba(0,0,0,0.08)",
                        }}
                      >
                        <div className="text-[11px] font-semibold text-slate-600">
                          {new Date(h.time).toLocaleTimeString([], {
                            hour: "numeric",
                            hour12: true,
                          })}
                        </div>

                        <img
                          src={h.condition.icon}
                          alt={h.condition.text}
                          className="my-1 h-8 w-8"
                          loading="lazy"
                        />

                        <div className="text-sm font-bold">{Math.round(h.temp_c)}°C</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 w-full overflow-x-auto">
              <div
                className="mx-auto flex justify-center no-scrollbar"
                style={{ minWidth: "1060px", flexWrap: "nowrap" }}
              >
                
                <section
                  className="shrink-0 rounded-[20px] p-4"
                  style={{
                    width: "500px",
                    boxSizing: "border-box",
                    background:
                      "linear-gradient(180deg, rgba(135,206,250,0.90), rgba(135,206,250,0.70))",
                    boxShadow:
                      "0 30px 63px rgba(0,0,0,0.20), 0 8px 18px rgba(0,0,0,0.12)",
                  }}
                >
                  <h3 className="mb-3 text-center text-lg font-extrabold text-slate-800">
                    Overview Forecast
                  </h3>

                  <div className="no-scrollbar flex gap-3 overflow-x-auto">
                    {days.map((d) => (
                      <div
                        key={d.date}
                        className="min-w-[150px] rounded-xl bg-white/85 p-3 text-center"
                        style={{
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.7), 0 4px 10px rgba(0,0,0,0.06)",
                        }}
                      >
                        <div className="text-[11px] font-semibold text-slate-600">
                          {new Date(d.date).toLocaleDateString(undefined, {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <img
                          src={d.day.condition.icon}
                          alt={d.day.condition.text}
                          className="mx-auto my-1 h-9 w-9"
                          loading="lazy"
                        />
                        <div className="text-[12px] text-slate-600">
                          {d.day.condition.text}
                        </div>
                        <div className="mt-1 text-sm font-bold">
                          {Math.round(d.day.maxtemp_c)}° / {Math.round(d.day.mintemp_c)}°
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div style={{ width: 48, flex: "0 0 48px" }} />

                <section
                  className="shrink-0 rounded-[20px] p-6"
                  style={{
                    width: "500px",
                    boxSizing: "border-box",
                    background:
                      "linear-gradient(180deg, rgba(135,206,250,0.90), rgba(135,206,250,0.70))",
                    boxShadow:
                      "0 30px 63px rgba(0,0,0,0.20), 0 8px 18px rgba(0,0,0,0.12)",
                  }}
                >
                  <h3 className="mb-4 text-center text-xl font-extrabold text-slate-800">
                    <span role="img" aria-label="pin">📌</span> More Info{" "}
                    <span role="img" aria-label="sun-small">🌤️</span>
                  </h3>

                  <div className="mx-auto max-w-[460px]">
                    <ul className="flex flex-col gap-3">
                      {[
                        { icon: "❄️", label: "UV Index", value: `${weather.current.uv} (Low)` },
                        { icon: "🌡️", label: "Feels Like", value: `${Math.round(weather.current.feelslike_c)}°C` },
                        { icon: "👁️", label: "Visibility", value: `${weather.current.vis_km} km` },
                        { icon: "📈", label: "Pressure", value: `${weather.current.pressure_mb} hPa` },
                        { icon: "☁️", label: "Cloudiness", value: `${weather.current.cloud}%` },
                      ].map(({ icon, label, value }) => (
                        <li
                          key={label}
                          className="grid grid-cols-[1fr_auto] items-center rounded-full px-6 h-[40px] text-[14px] font-semibold text-slate-800"
                          style={{
                            background: "rgba(255,255,255,0.72)",
                            boxShadow:
                              "inset 0 1px 0 rgba(255,255,255,0.7), 0 4px 10px rgba(0,0,0,0.06)",
                          }}
                        >
                          <span className="flex items-center gap-2 truncate">
                            <span aria-hidden className="opacity-80">{icon}</span>
                            <span className="truncate">{label}</span>
                          </span>
                          <span className="pl-4 text-slate-900 whitespace-nowrap">
                            {value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex justify-center gap-4 opacity-90">
                    <span role="img" aria-label="emoji-1">🖼️</span>
                    <span role="img" aria-label="emoji-2">☀️</span>
                    <span role="img" aria-label="emoji-3">☁️</span>
                  </div>
                </section>
              </div>
            </div>
           
          </>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
