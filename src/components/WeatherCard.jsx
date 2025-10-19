import React from "react";

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const city = weather.location.name;
  const country = weather.location.country;
  const temp = Math.round(weather.current.temp_c);
  const icon = weather.current.condition.icon;
  const condition = weather.current.condition.text;

  const when = weather.location?.localtime
    ? new Date(weather.location.localtime.replace(/-/g, "/"))
    : new Date();
  const dateLabel = when.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const humidity = `${weather.current.humidity}%`;
  const wind = `${Math.round(weather.current.wind_kph)} km/h`;

  return (
   <div className="w-full flex justify-center">
     <div
       className="w-full max-w-[500px] rounded-[10px] bg-white/95 p-6 sm:p-7"
        style={{
         boxShadow:
          "0 28px 60px rgba(0,0,0,0.16), 0 8px 18px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.55)",
        }}
      >
       <div className="flex flex-col items-center text-center">
         <img
           src={icon}
           alt={condition}
           className="h-16 w-16 sm:h-20 sm:w-20 select-none"
           loading="lazy"
         />
       <div className="mt-2 text-[48px] sm:text-[56px] font-extrabold text-slate-900 tracking-tight leading-none">
         {temp}°C
       </div>

       <div className="mt-1 text-xl sm:text-2xl font-semibold text-slate-800 leading-tight">
         {city}, {country}
       </div>
     </div>

     <div
       className="mt-5 flex items-center justify-between text-[15px] sm:text-base"
       style={{ padding: "0 0.30rem" }}
      >
       <div className="font-semibold text-slate-700">{dateLabel}</div>
         <div className="text-slate-700">{condition}</div>
       </div>

       <div
         className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
         style={{ padding: "0 0.30rem" }}
       >
          
       <div
         className="flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-semibold text-slate-800 transition-all duration-300 ease-in-out"
          style={{
            background: "rgba(135,206,250,0.20)",
             boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.65), 0 4px 10px rgba(0,0,0,0.06)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.background = "rgba(255,255,255,0.85)";
              e.currentTarget.style.boxShadow =
                "0 6px 18px rgba(0,0,0,0.18), 0 0 12px rgba(135,206,250,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "rgba(135,206,250,0.20)";
              e.currentTarget.style.boxShadow =
                "inset 0 1px 0 rgba(255,255,255,0.65), 0 4px 10px rgba(0,0,0,0.06)";
            }}
          >
           <span className="flex items-center gap-2">
             <span role="img" aria-label="humidity">
               💧
             </span>
              Humidity
            </span>
           <span>{humidity}</span>
          </div>

          <div
            className="flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-semibold text-slate-800 transition-all duration-300 ease-in-out"
            style={{
              background: "rgba(135,206,250,0.20)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.65), 0 4px 10px rgba(0,0,0,0.06)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.background = "rgba(255,255,255,0.85)";
              e.currentTarget.style.boxShadow =
                "0 6px 18px rgba(0,0,0,0.18), 0 0 12px rgba(135,206,250,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "rgba(135,206,250,0.20)";
              e.currentTarget.style.boxShadow =
                "inset 0 1px 0 rgba(255,255,255,0.65), 0 4px 10px rgba(0,0,0,0.06)";
            }}
          >
           <span className="flex items-center gap-2">
             <span role="img" aria-label="wind">
               🌬️
             </span>
              Wind
            </span>
            <span>{wind}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
