import React from 'react';
import './WeatherDetails.css';

export default function WeatherDetails({ data }) {
  if (!data) return null;

  const formatTime = (unixTimestamp, timezoneOffset) => {
    const date = new Date((unixTimestamp + timezoneOffset) * 1000);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minString = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minString} ${ampm}`;
  };

  return (
    <section className="details-grid">
      <div className="detail-card">
        <span className="emoji">💧</span>
        <p className="label">Humidity</p>
        <p className="value">{data.main.humidity}%</p>
      </div>
      <div className="detail-card">
        <span className="emoji">💨</span>
        <p className="label">Wind Speed</p>
        <p className="value">{(data.wind.speed * 3.6).toFixed(1)} km/h</p>
      </div>
      <div className="detail-card">
        <span className="emoji">👁️</span>
        <p className="label">Visibility</p>
        <p className="value">{(data.visibility / 1000).toFixed(1)} km</p>
      </div>
      <div className="detail-card">
        <span className="emoji">⏱️</span>
        <p className="label">Pressure</p>
        <p className="value">{data.main.pressure} hPa</p>
      </div>
      <div className="detail-card">
        <span className="emoji">🌅</span>
        <p className="label">Sunrise</p>
        <p className="value">{formatTime(data.sys.sunrise, data.timezone)}</p>
      </div>
      <div className="detail-card">
        <span className="emoji">🌇</span>
        <p className="label">Sunset</p>
        <p className="value">{formatTime(data.sys.sunset, data.timezone)}</p>
      </div>
    </section>
  );
}
