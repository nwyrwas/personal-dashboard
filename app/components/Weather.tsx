"use client";

import { useState, useEffect, useCallback } from "react";

interface WeatherData {
  temp: number;
  feels_like: number;
  description: string;
  icon: string;
  city: string;
}

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [cityInput, setCityInput] = useState("");
  const [error, setError] = useState("");

  const fetchWeather = useCallback((city?: string) => {
    setLoading(true);
    setError("");

    const url = city
      ? `/api/weather?city=${encodeURIComponent(city)}`
      : "/api/weather";

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      fetchWeather(cityInput.trim());
      setCityInput("");
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
      <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
        Weather{weather ? ` — ${weather.city}` : ""}
      </h2>

      {loading ? (
        <div className="animate-pulse mt-3">
          <div className="h-8 bg-gray-700 rounded w-32"></div>
        </div>
      ) : error ? (
        <p className="text-red-400 text-sm mt-3">{error}</p>
      ) : weather ? (
        <div className="flex items-center gap-4 mt-2">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            className="w-16 h-16"
          />
          <div>
            <p className="text-4xl font-bold">{weather.temp}°F</p>
            <p className="text-gray-400 capitalize">{weather.description}</p>
            <p className="text-gray-500 text-sm">
              Feels like {weather.feels_like}°F
            </p>
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Search city..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
        />
      </form>
    </div>
  );
}
