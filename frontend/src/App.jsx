import React, { useState } from 'react';
import './App.css';

function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/weather?city=${city}`);
            const data = await response.json();
            if (data.error) {
                setError(data.error);
                setWeather(null);
            } else {
                setWeather(data);
                setError('');
            }
        } catch (err) {
            setError('Error fetching weather');
            setWeather(null);
        }
    };

    return (
        <div className="weather-container">
            <h1>🌤 Weather App</h1>
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather}>Get Weather</button>

            {error && <p className="error">{error}</p>}

            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <p>🌡 Temperature: {weather.main.temp}°C</p>
                    <p>💧 Humidity: {weather.main.humidity}%</p>
                    <p>🌥 Condition: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}

export default App;
