import React from "react";

const WeatherCard = ({ weather }) => {
  return (
    <div className="mt-6 bg-white p-6 rounded shadow-md text-center">
      <h2 className="text-2xl font-semibold mb-2">
        {weather.location.name}, {weather.location.country}
      </h2>
      <img
        src={weather.current.condition.icon}
        alt={weather.current.condition.text}
        className="mx-auto"
      />
      <p className="text-xl">{weather.current.temp_c}°C</p>
      <p className="text-gray-600">{weather.current.condition.text}</p>
      <p>Humidity: {weather.current.humidity}%</p>
      <p>Wind: {weather.current.wind_kph} kph</p>
    </div>
  );
};

export default WeatherCard;
