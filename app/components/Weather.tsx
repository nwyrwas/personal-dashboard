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
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 text-center">
      <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
        Weather
      </h2>

      {loading ? (
        <div className="animate-pulse mt-3 space-y-3">
          <div className="h-10 bg-gray-700/50 rounded w-24"></div>
          <div className="h-4 bg-gray-700/50 rounded w-32"></div>
        </div>
      ) : error ? (
        <p className="text-red-400 text-sm mt-3">{error}</p>
      ) : weather ? (
        <div className="mt-3">
          <div className="flex items-center gap-3 justify-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
              className="w-14 h-14 -ml-2"
            />
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight">
                  {weather.temp}
                </span>
                <span className="text-2xl text-gray-400">°F</span>
              </div>
            </div>
          </div>
          <div className="mt-1 space-y-0.5">
            <p className="text-sm text-gray-300 capitalize">
              {weather.description} in{" "}
              <span className="text-white font-medium">{weather.city}</span>
            </p>
            <p className="text-xs text-gray-500">
              Feels like {weather.feels_like}°F
            </p>
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Search city..."
            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
          />
        </div>
      </form>
    </div>
  );
}
