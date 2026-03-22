"use client";

import { useState, useEffect } from "react";

interface SiteStatus {
  name: string;
  url: string;
  status: "up" | "down";
  responseTime: number;
}

export default function Status() {
  const [sites, setSites] = useState<SiteStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => {
        setSites(data.sites || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-24 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-full mb-3"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
      </div>
    );
  }

  const allUp = sites.every((site) => site.status === "up");

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
          Status
        </h2>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            allUp
              ? "bg-green-400/10 text-green-400"
              : "bg-red-400/10 text-red-400"
          }`}
        >
          {allUp ? "All Systems Go" : "Issues Detected"}
        </span>
      </div>
      <ul className="space-y-3">
        {sites.map((site) => (
          <li key={site.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  site.status === "up" ? "bg-green-400" : "bg-red-400"
                }`}
              />
              <a
                href={site.url}
                target="_blank"
                className="text-sm text-gray-200 hover:text-blue-400 transition-colors"
              >
                {site.name}
              </a>
            </div>
            <span className="text-xs text-gray-500">
              {site.status === "up" ? `${site.responseTime}ms` : "Down"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
