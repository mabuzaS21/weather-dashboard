import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
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
    <div className="min-h-screen bg-gradient-to-b from-[#dfeffe] to-[#cfe7ff]">
      <NavBar />

      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-800">
            Weather Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm text-slate-700">Welcome, <span className="font-medium">{username}</span></h2>
          <div className="w-full sm:w-auto sm:min-w-[360px]">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        
        {error && (
          <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            ❌ {error}
          </p>
        )}
        {loading && (
          <p className="mt-2 text-sm text-blue-600">Loading weather data...</p>
        )}

        {weather && !loading && (
          <section className="mt-4">
            <WeatherCard weather={weather} />
          </section>
        )}

        {!weather && !loading && !error && (
          <section className="mt-4">
            <div className="rounded-2xl bg-white p-8 text-center shadow">
              <h3 className="text-lg font-semibold text-slate-800">SEARCH A CITY</h3>
              <p className="mt-1 text-sm text-slate-600">
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
