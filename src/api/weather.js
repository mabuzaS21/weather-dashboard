const API_KEY = "61817d91f3054ee8b98175212250410";  

export async function fetchWeather(city) {
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`
  );
  if (!res.ok) throw new Error("City not found");
  return res.json();
}

export async function fetchForecast(city, days = 3) {
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
      city
    )}&days=${days}&aqi=no&alerts=no`
  );
  if (!res.ok) throw new Error("City not found");
  return res.json();
}
