import React, { useState } from "react";
import "./Home.css";

export default function Home() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=bbd27d52d5ce4acc90b205446250103&q=${city}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const res = await response.json();
      setData(res);
    } catch (err) {
      setError("Failed to fetch weather data");
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="main">
        <div className="input-container">
          <input
            className="inp"
            type="text"
            value={city}
            placeholder="Enter city name"
            onChange={(event) => setCity(event.target.value)}
          />
          <button className="btn" type="button" onClick={fetchWeather}>
            Search
          </button>
        </div>
        {loading && <p>Loading data…</p>}
        {error && <p className="error-message">{error}</p>}
        {data && (
          <div className="weather-cards">
            <div className="weather-card">
              <h3>Temperature</h3>
              <p>{data.current.temp_c}°C</p>
            </div>
            <div className="weather-card">
              <h3>Humidity</h3>
              <p>{data.current.humidity}%</p>
            </div>
            <div className="weather-card">
              <h3>Condition</h3>
              <p>{data.current.condition.text}</p>
            </div>
            <div className="weather-card">
              <h3>Wind Speed</h3>
              <p>{data.current.wind_kph} kph</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
