import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import { fetchWeather } from "./api/weather";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleSearch = async (searchedCity) => {
    try {
      setError("");
      setWeather(null);
      setCity(searchedCity);
      setLoading(true); 

      const data = await fetchWeather(searchedCity);
      setWeather(data);
    } catch (err) {
      setError(err.message || "City not found");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4">
      <h1 className="text-3xl font-bold mb-4">Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />

      {error && (
        <p className="text-red-500 mt-4">
          ❌ {error}
        </p>
      )}

      {loading && (
        <p className="text-blue-500 mt-4">Loading weather data...</p>
      )}

      {weather && !loading && (
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
      )}
    </div>
  );
}

export default App;