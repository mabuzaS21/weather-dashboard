import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { fetchWeather } from "../api/weather";

const Dashboard = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
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
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Weather Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl mb-4"> Welcome, {username}</h2>

      <SearchBar onSearch={handleSearch} />

      {error && <p className="text-red-500 mt-4">❌ {error}</p>}

      {loading && <p className="text-blue-500 mt-4">Loading weather data...</p>}

      {weather && !loading && <WeatherCard weather={weather} />}
    </div>
  );
};

export default Dashboard;
