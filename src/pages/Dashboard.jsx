import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { fetchWeather } from "../api/weather";

const Dashboard = () => {
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

      {error && <p className="text-red-500 mt-4">❌ {error}</p>}

      {loading && <p className="text-blue-500 mt-4">Loading weather data...</p>}

      {weather && !loading && <WeatherCard weather={weather} />}
    </div>
  );
};

export default Dashboard;
