"use client";

import { useState, useEffect } from "react";

interface GitHubData {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  profile_url: string;
}

export default function GitHub() {
  const [github, setGithub] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        setGithub(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 animate-pulse">
        <div className="h-4 bg-gray-700/50 rounded w-24 mb-4"></div>
        <div className="flex items-center gap-4 mt-3">
          <div className="w-14 h-14 bg-gray-700/50 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700/50 rounded w-28"></div>
            <div className="h-3 bg-gray-700/50 rounded w-20"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!github) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50">
        <p className="text-red-400">Failed to load GitHub data</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 text-center">
      <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
        GitHub
      </h2>
      <div className="flex items-center gap-4 mt-3 justify-center">
        <img
          src={github.avatar}
          alt={github.name}
          className="w-14 h-14 rounded-full ring-2 ring-gray-700/50"
        />
        <div>
          <p className="font-bold text-lg leading-tight">{github.name}</p>
          <a
            href={github.profile_url}
            target="_blank"
            className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
          >
            @{github.username}
          </a>
        </div>
      </div>
      {github.bio && (
        <p className="text-gray-400 text-sm mt-3 leading-relaxed">{github.bio}</p>
      )}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-800/50">
        <div className="text-center">
          <p className="text-2xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            {github.public_repos}
          </p>
          <p className="text-gray-500 text-xs mt-0.5">Repos</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            {github.followers}
          </p>
          <p className="text-gray-500 text-xs mt-0.5">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            {github.following}
          </p>
          <p className="text-gray-500 text-xs mt-0.5">Following</p>
        </div>
      </div>
    </div>
  );
}
