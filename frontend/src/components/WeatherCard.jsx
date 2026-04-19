import React from 'react';
import './WeatherCard.css';

export default function WeatherCard({ data }) {
  if (!data) return null;

  return (
    <section className="weather-mobile">
      <div className="mega-temp">
        {Math.round(data.main.temp)}<span className="degree">°C</span>
      </div>
      <div className="condition-line">
        {data.weather[0].main} {Math.round(data.main.temp_max)}°<span className="slash">/</span>{Math.round(data.main.temp_min)}°
      </div>
      <div className="aqi-badge">
        <span className="leaf-icon">🍃</span> AQI 83
      </div>
    </section>
  );
}
