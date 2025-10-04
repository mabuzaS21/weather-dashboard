const API_KEY = "61817d91f3054ee8b98175212250410"; 

export async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}