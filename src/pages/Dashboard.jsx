import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { fetchWeather } from "../api/weather";

function MiniDayCard({ dateISO, icon, condition, maxC }) {
  const d = new Date(dateISO);
  const weekday = d.toLocaleDateString(undefined, { weekday: "long" });
  const fullDate = d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
   <div
     className="mini-day-card w-[140px] h-[164px] rounded-[20px] text-center"
     style={{
        background: "#f3f4f6",
        boxShadow: "0 10px 22px rgba(0,0,0,0.10), 0 4px 10px rgba(0,0,0,0.06)",
        transition: "all 0.25s ease",
      }}
    > 
     <img
        src={icon}
        alt={condition}
        className="mx-auto -mt-5 h-8 w-8 select-none"
        loading="lazy"
      />

     <div className="mt-1 text-[28px] leading-none font-extrabold text-slate-900">
        {Math.round(maxC)}
        <sup className="align-super text-[12px] font-semibold">°</sup>
     </div>

     <div className="mt-1 text-sm font-semibold text-slate-800">{weekday}</div>

     <div className="mt-0.5 text-[12px] text-slate-500 px-2">{fullDate}</div>
    </div>
  );
}

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
          <span className="text-white text-lg font-bold">
              Weather Dashboard
          </span>
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
               className="mx-auto overflow-x-auto forecast-scroll"
                style={{
                    maxWidth: 980,
                    borderRadius: 22,
                    padding: "18px 22px 12px",
                    marginBottom: "20px",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.75), rgba(255,255,255,0.55))",
                    boxShadow:
                      "inset 0 0 40px rgba(0,0,0,0.10), 0 12px 26px rgba(0,0,0,0.10)",
                 }}
                >

             <div
               className="flex items-stretch px-3"
                 style={{
                    columnGap: "10px",
                    paddingLeft: "2px",
                    paddingRight: "16px",
                    }}
                  >
                 {hours.map((h) => (
                   <div
                      key={h.time}
                       className="hourly-card flex min-w-[100px] flex-col items-center justify-between rounded-[16px] px-4 py-3 text-center"
                        style={{
                         background: "rgba(255,255,255,0.8)",
                          boxShadow:
                           "inset 0 1px 0 rgba(255,255,255,0.65), 0 6px 14px rgba(0,0,0,0.08)",
                          transition: "all 0.25s ease",
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
                        className="my-1 h-8 w-8 select-none"
                        loading="lazy"
                     />

                    <div className="text-sm font-bold text-slate-800">
                        {Math.round(h.temp_c)}°C
                      </div>
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
                className="shrink-0 rounded-[20px] p-6 flex flex-col justify-center"
                 style={{
                  width: "500px",
                  minHeight: "360px",
                  background:
                   "linear-gradient(180deg, rgba(135,206,250,0.90), rgba(135,206,250,0.70))",
                    boxShadow:
                    "0 30px 63px rgba(0,0,0,0.20), 0 8px 18px rgba(0,0,0,0.12)",
                 }}
                >
                 <h3
                   className="text-center font-extrabold text-slate-800 mb-4 text-[28px]"
                   style={{ transform: "translateY(-20px)" }}
                  >
                   Overview Forecast
                 </h3>

                 <div
                   className="flex items-start justify-center"
                   style={{ gap: "20px", marginTop: "2px" }}
                 >
                  {days.slice(0, 3).map((d) => (
                    <MiniDayCard
                      key={d.date}
                      dateISO={d.date}
                      icon={d.day.condition.icon}
                      condition={d.day.condition.text}
                      maxC={d.day.maxtemp_c}
                    />
                  ))}
                </div>
              </section>

          <div style={{ width: 48, flex: "0 0 48px" }} />

           <section
             className="shrink-0 rounded-[20px] p-6"
                style={{
                width: "500px", 
                background:
                "linear-gradient(180deg, rgba(135,206,250,0.90), rgba(135,206,250,0.70))",
                boxShadow:
                "0 30px 63px rgba(0,0,0,0.20), 0 8px 18px rgba(0,0,0,0.12)",
              }}
            >
             <h3 className="mb-4 text-center text-xl font-extrabold text-slate-800">
                📌 More Info 🌤️
             </h3>

          <div className="mx-auto max-w-[460px]">
           <ul className="flex flex-col" style={{ rowGap: "10px" }}>
             {[
               {
                 icon: "❄️",
                 label: "UV Index",
                 value: `${weather.current.uv} (Low)`,
               },
               {
                 icon: "🌡️",
                 label: "Feels Like",
                 value: `${Math.round(weather.current.feelslike_c)}°C`,
               },
               {
                 icon: "👁️",
                 label: "Visibility",
                 value: `${weather.current.vis_km} km`,
               },
               {
                 icon: "📈",
                 label: "Pressure",
                 value: `${weather.current.pressure_mb} hPa`,
               },
               {
                 icon: "☁️",
                 label: "Cloudiness",
                 value: `${weather.current.cloud}%`,
               },
                ].map(({ icon, label, value }) => (
                  <li
                     key={label}
                      className="info-pill flex justify-between items-center rounded-full text-[13px] font-semibold text-slate-800"
                       style={{
                        background: "rgba(255,255,255,0.72)",
                         boxShadow:
                           "inset 0 1px 0 rgba(255,255,255,0.7), 0 4px 10px rgba(0,0,0,0.06)",
                           padding: "0 26px",
                           height: "42px",
                           letterSpacing: "0.3px",
                         }}
                        >
                        <span className="flex items-center gap-3 truncate">
                           <span aria-hidden className="opacity-80">
                            {icon}
                            </span>
                           <span className="truncate">{label}</span>
                         </span>
                        <span className="pl-6 text-slate-900 whitespace-nowrap">
                           {value}
                         </span>
                       </li>
                     ))}
                  </ul>
                </div>

                <div className="mt-4 flex justify-center gap-4 opacity-90">
                    <span>🖼️</span>
                    <span>☀️</span>
                    <span>☁️</span>
                </div>
              </section>
            </div>
          </div>
        </>
      )}
  </div>

  <style>{`

     .forecast-scroll {
          scrollbar-color: rgba(180,180,180,0.6) transparent;
          scrollbar-width: thin;
        }

     .forecast-scroll::-webkit-scrollbar {
          height: 6px;
          width: 60%;
        }

     .forecast-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

     .forecast-scroll::-webkit-scrollbar-thumb {
          background: rgba(180, 180, 180, 0.6);
          border-radius: 3px;
          width: 20px;
          margin left:27.5 px; 
        }

     .forecast-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(150, 150, 150, 0.8);
        }

     .no-scrollbar::-webkit-scrollbar { display: none; }
     .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

     .info-pill {
          transition: all 0.25s ease;
        }
     .info-pill:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18),
          0 0 12px rgba(135, 206, 250, 0.5);
        }

     .mini-day-card:hover {
          transform: translateY(-6px);
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18),
          0 0 16px rgba(135, 206, 250, 0.45);
        }

     .hourly-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18),
          0 0 12px rgba(135, 206, 250, 0.5);
        }
      `}</style>
    </div>
  );
}
