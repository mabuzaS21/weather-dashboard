import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-3 rounded-lg bg-white p-3 shadow-sm"
    >
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-300"
      />
      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
