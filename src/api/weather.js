const API_KEY = "61817d91f3054ee8b98175212250410";   

export async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );
    if (!response.ok) throw new Error("City not found");
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchForecast(city, days = 3) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
        city
      )}&days=${days}&aqi=no&alerts=no`
    );
    if (!response.ok) throw new Error("City not found");
    return await response.json();
  } catch (error) {
    throw error; 
  }
}
