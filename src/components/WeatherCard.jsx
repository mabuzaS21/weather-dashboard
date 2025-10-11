import React from "react";

const WeatherCard = ({ weather }) => {
  const { location, current } = weather;

  return (
    <div className="mx-auto mt-8 w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-md">
      <h2 className="mb-2 text-2xl font-semibold text-blue-700">
        {location.name}, {location.country}
      </h2>

      <img
        src={current.condition.icon}
        alt={current.condition.text}
        className="mx-auto h-20 w-20"
      />

      <p className="mt-2 text-4xl font-bold text-slate-800">
        {current.temp_c}°C
      </p>
      <p className="text-slate-600">{current.condition.text}</p>

      <hr className="my-4 border-slate-200" />

      <div className="flex justify-around text-sm text-slate-700">
        <p>
          💧 <span className="font-medium">{current.humidity}%</span> Humidity
        </p>
        <p>
          🌬️ <span className="font-medium">{current.wind_kph} km/h</span> Wind
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
