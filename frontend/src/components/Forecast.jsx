import React from 'react';
import './Forecast.css';

export default function Forecast({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="forecast-card-mobile">
      <div className="forecast-header">
        <span className="calendar-icon">📅</span> 5-day forecast
      </div>
      
      <div className="forecast-list">
        {data.map((day, index) => {
          const date = new Date(day.dt * 1000);
          let dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          if (index === 0) dayName = "Today";
          if (index === 1) dayName = "Tomorrow";

          const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
          const condition = day.weather[0].main;

          return (
            <div key={day.dt} className="forecast-list-item">
              <div className="day-info">
                <img src={iconUrl} alt="icon" className="list-icon" />
                <span className="day-name">{dayName}</span>
                <span className="day-condition">{condition}</span>
              </div>
              <div className="temps">
                {Math.round(day.main.temp_max)}° <span className="slash">/</span> {Math.round(day.main.temp_min)}°
              </div>
            </div>
          );
        })}
      </div>

      <button className="full-forecast-btn">5-day forecast</button>
    </section>
  );
}
