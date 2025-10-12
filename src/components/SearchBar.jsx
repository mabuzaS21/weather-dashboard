import React, { useState } from "react";

const SearchBar = ({
  onSearch,
  placeholder = "Enter city name",
  maxWidth = 400, 
}) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2"
      style={{ maxWidth, width: "100%" }}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm outline-none focus:border-sky-400"
      />
      <button
        type="submit"
        className="rounded-md bg-sky-600 px-3 py-1 text-xs font-semibold text-white hover:bg-sky-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
