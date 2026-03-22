"use client";

import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!time) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
          Current Time
        </h2>
        <p className="text-4xl font-bold mt-2">--:--:--</p>
      </div>
    );
  }

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const isPM = hours >= 12;
  const display12 = hours % 12 || 12;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 text-center">
      <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
        Current Time
      </h2>
      <div className="flex items-baseline gap-1 mt-3 justify-center">
        <span className="text-5xl font-bold tabular-nums tracking-tight">
          {String(display12).padStart(2, "0")}
        </span>
        <span className="text-5xl font-bold tabular-nums tracking-tight text-blue-400 animate-pulse">
          :
        </span>
        <span className="text-5xl font-bold tabular-nums tracking-tight">
          {String(minutes).padStart(2, "0")}
        </span>
        <span className="text-2xl font-bold tabular-nums text-gray-500 ml-1">
          {String(seconds).padStart(2, "0")}
        </span>
        <span className="text-sm font-medium text-gray-500 ml-2 uppercase">
          {isPM ? "PM" : "AM"}
        </span>
      </div>
      <p className="text-gray-400 mt-2 text-sm">
        {time.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
