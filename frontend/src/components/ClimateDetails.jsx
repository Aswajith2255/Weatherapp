import React from 'react';
import './ClimateDetails.css';

export default function ClimateDetails({ data }) {
  if (!data) return null;

  return (
    <div className="climate-details">
      <h3>Sun & Climate</h3>
      <div className="climate-grid">
        <div className="climate-card">
          <span className="label">Sunrise</span>
          <span className="value">{data.sunrise}</span>
        </div>
        <div className="climate-card">
          <span className="label">Sunset</span>
          <span className="value">{data.sunset}</span>
        </div>
        <div className="climate-card">
          <span className="label">UV Index</span>
          <span className="value">{data.uv_index}</span>
        </div>
      </div>
      
      <div className="climate-bars">
        <div className="bar-item">
          <div className="bar-info">
            <span>Humidity</span>
            <span>{data.humidity}%</span>
          </div>
          <div className="bar-bg">
            <div className="bar-fill" style={{ width: `${data.humidity}%` }}></div>
          </div>
        </div>

        <div className="bar-item">
          <div className="bar-info">
            <span>Cloud Cover</span>
            <span>{data.cloud_cover}%</span>
          </div>
          <div className="bar-bg">
            <div className="bar-fill" style={{ width: `${data.cloud_cover}%` }}></div>
          </div>
        </div>

        <div className="bar-item">
          <div className="bar-info">
            <span>Wind Speed</span>
            <span>{data.wind_speed} km/h</span>
          </div>
          <div className="bar-bg">
            <div className="bar-fill" style={{ width: `${Math.min((data.wind_speed / 100) * 100, 100)}%` }}></div>
          </div>
        </div>

        <div className="bar-item">
          <div className="bar-info">
            <span>Rain Chance</span>
            <span>{data.rain_chance}%</span>
          </div>
          <div className="bar-bg">
            <div className="bar-fill" style={{ width: `${data.rain_chance}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
