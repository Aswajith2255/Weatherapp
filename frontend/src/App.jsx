import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Loader from './components/Loader';
import ErrorCard from './components/ErrorCard';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import ClimateDetails from './components/ClimateDetails';

const getIconAndCondition = (wmo) => {
  if (wmo === 0) return { main: 'Clear', conditionKey: 'clear' };
  if (wmo >= 1 && wmo <= 2) return { main: 'Partly Cloudy', conditionKey: 'cloudy' };
  if (wmo === 3) return { main: 'Cloudy', conditionKey: 'cloudy' };
  if (wmo === 45 || wmo === 48) return { main: 'Fog', conditionKey: 'fog' };
  if (wmo >= 51 && wmo <= 55) return { main: 'Drizzle', conditionKey: 'drizzle' };
  if (wmo >= 61 && wmo <= 65) return { main: 'Rain', conditionKey: 'rain' };
  if (wmo >= 71 && wmo <= 77) return { main: 'Snow', conditionKey: 'snow' };
  if (wmo >= 80 && wmo <= 82) return { main: 'Showers', conditionKey: 'showers' };
  if (wmo >= 95) return { main: 'Storm', conditionKey: 'storm' };
  return { main: 'Clear', conditionKey: 'clear' };
};

const formatTime = (timeStr) => {
  if (!timeStr) return '';
  return new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function App() {
  const [city, setCity] = useState("Live Location");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryAction, setRetryAction] = useState(null);
  const [unit, setUnit] = useState('C');

  useEffect(() => {
    if (weatherData && weatherData.weather[0].conditionKey) {
      document.body.setAttribute('data-weather', weatherData.weather[0].conditionKey);
    } else {
      document.body.removeAttribute('data-weather');
    }
  }, [weatherData]);

  const fetchWeatherDataByCoords = async (lat, lon, knownCityName = null) => {
    setLoading(true);
    setError(null);
    try {
      let finalCityName = knownCityName;
      if (!finalCityName) {
        try {
          const nomRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
          if (nomRes.ok) {
            const nomData = await nomRes.json();
            if (nomData && nomData.address) {
              const addr = nomData.address;
              finalCityName = addr.neighbourhood || addr.residential || addr.hamlet || addr.local_authority || addr.village || addr.suburb || addr.town || addr.city_district || addr.city || addr.county;
            }
          }
        } catch (e) {
          console.warn("Nominatim reverse geocode failed, falling back to BigDataCloud.");
        }

        if (!finalCityName) {
          const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
          const geoData = await geoRes.json();
          finalCityName = geoData.city || geoData.locality || "Live Location";
        }
      }
      setCity(finalCityName);

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=auto`;
      const weatherRes = await fetch(url);
      if (!weatherRes.ok) throw new Error("Could not fetch weather data.");
      const data = await weatherRes.json();

      const currWmo = data.current.weather_code;
      const currMapped = getIconAndCondition(currWmo);

      const mappedCurrent = {
        name: finalCityName,
        weather: [{ main: currMapped.main, conditionKey: currMapped.conditionKey }],
        main: {
          temp: data.current.temperature_2m,
          feels_like: data.current.apparent_temperature,
          temp_max: data.daily.temperature_2m_max[0],
          temp_min: data.daily.temperature_2m_min[0]
        },
        climate: {
          sunrise: formatTime(data.daily.sunrise[0]),
          sunset: formatTime(data.daily.sunset[0]),
          uv_index: data.daily.uv_index_max[0],
          humidity: data.current.relative_humidity_2m,
          cloud_cover: data.current.cloud_cover,
          wind_speed: data.current.wind_speed_10m,
          rain_chance: data.daily.precipitation_probability_max[0] || 0
        }
      };

      const mappedForecast = data.daily.time.slice(1, 6).map((timeStr, index) => {
        const actualIndex = index + 1;
        const dailyMapped = getIconAndCondition(data.daily.weather_code[actualIndex]);
        const dateObj = new Date(timeStr);
        return {
          dt: dateObj.getTime() / 1000,
          dateStr: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
          weather: [{ main: dailyMapped.main, conditionKey: dailyMapped.conditionKey }],
          main: {
            temp_max: data.daily.temperature_2m_max[actualIndex],
            temp_min: data.daily.temperature_2m_min[actualIndex]
          }
        };
      });

      setWeatherData(mappedCurrent);
      setForecastData(mappedForecast);
    } catch (err) {
      setWeatherData(null);
      setForecastData([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherBySearch = async (searchCity) => {
    setRetryAction(() => () => fetchWeatherBySearch(searchCity));
    setLoading(true);
    setError(null);
    setCity(searchCity);
    try {
      let lat, lon, displayName;
      const encodedCity = encodeURIComponent(searchCity);

      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodedCity}&count=1`);
      const geoData = await geoRes.json();
      if (geoData.results && geoData.results.length > 0) {
        const result = geoData.results[0];
        lat = result.latitude;
        lon = result.longitude;
        displayName = result.country ? `${result.name}, ${result.country}` : result.name;
      } else {
        const nomRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodedCity}&format=json&limit=1`);
        const nomData = await nomRes.json();
        if (nomData && nomData.length > 0) {
          const result = nomData[0];
          lat = parseFloat(result.lat);
          lon = parseFloat(result.lon);
          const nameParts = result.display_name.split(', ');
          displayName = nameParts.length > 1 ? `${nameParts[0]}, ${nameParts[nameParts.length - 1]}` : result.name || searchCity;
        } else {
          throw new Error("City not found.");
        }
      }

      await fetchWeatherDataByCoords(lat, lon, displayName);
    } catch (err) {
      setWeatherData(null);
      setForecastData([]);
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchByLocation = (isInitialLoad = false) => {
    setRetryAction(() => fetchByLocation);
    setLoading(true);
    setError(null);
    setCity("Live Location");

    const fallbackToIP = async (originalErrorMsg) => {
      try {
        const ipRes = await fetch('https://get.geojs.io/v1/ip/geo.json');
        if (!ipRes.ok) throw new Error("IP geolocation failed");
        const ipData = await ipRes.json();
        fetchWeatherDataByCoords(parseFloat(ipData.latitude), parseFloat(ipData.longitude), ipData.city);
      } catch (err) {
        if (isInitialLoad === true) {
          fetchWeatherBySearch("New Delhi");
        } else {
          setWeatherData(null);
          setForecastData([]);
          setLoading(false);
          setError(originalErrorMsg || "Unable to retrieve your location. Please use the search bar.");
        }
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherDataByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          let errorMessage = "Unable to retrieve your location. Please use the search bar.";
          if (error.code === 1) {
            errorMessage = "Location access denied. Please allow location access or use the search bar.";
          }
          fallbackToIP(errorMessage);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      fallbackToIP("Geolocation is not supported by your browser. Please use the search bar.");
    }
  };

  useEffect(() => {
    fetchByLocation(true);
  }, []);

  const toggleUnit = () => setUnit(prev => prev === 'C' ? 'F' : 'C');

  const handleRetry = () => {
    if (retryAction) retryAction();
  };

  return (
    <div className="App">
      <Navbar cityName={weatherData ? weatherData.name : city} unit={unit} onToggleUnit={toggleUnit} />

      <main className="container">
        <SearchBar onSearch={fetchWeatherBySearch} onLocate={fetchByLocation} />

        {loading && <Loader />}
        {error && !loading && <ErrorCard message={error} onRetry={handleRetry} />}

        {!loading && !error && weatherData && (
          <div className="weather-content">
            <WeatherCard data={weatherData} unit={unit} />
            <ClimateDetails data={weatherData.climate} />
            <Forecast data={forecastData} unit={unit} />
          </div>
        )}
      </main>
    </div>
  );
}
