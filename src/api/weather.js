const API_KEY = "61817d91f3054ee8b98175212250410"; 

export async function fetchWeather(city) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
    city
  )}&days=5&aqi=no&alerts=no`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("City not found");
  return res.json();
}
