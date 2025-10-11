import React from "react";

const WeatherCard = ({ weather }) => {
  const { location, current } = weather || {};
  return (
    <div className="rounded-2xl bg-white p-6 text-center shadow-md ring-1 ring-slate-200">
      <h2 className="mb-1 text-xl font-semibold text-slate-800">
        {location?.name}, {location?.country}
      </h2>
      <p className="mb-4 text-xs text-slate-500">
        Updated {current?.last_updated}
      </p>

      <img
        src={current?.condition?.icon}
        alt={current?.condition?.text}
        className="mx-auto h-16 w-16"
      />

      <div className="mt-3">
        <p className="text-5xl font-extrabold text-slate-800">
          {Math.round(current?.temp_c)}°C
        </p>
        <p className="text-sm text-slate-600">{current?.condition?.text}</p>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
        {[
          ["Humidity", `${current?.humidity}%`],
          ["Wind", `${current?.wind_kph} km/h`],
          ["Feels", `${Math.round(current?.feelslike_c)}°C`],
        ].map(([label, val]) => (
          <div
            key={label}
            className="rounded-lg border border-slate-200 bg-white p-3"
          >
            <p className="text-slate-500">{label}</p>
            <p className="font-semibold text-slate-800">{val}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
