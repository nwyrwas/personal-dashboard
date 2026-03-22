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
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-24 mb-4"></div>
        <div className="h-8 bg-gray-700 rounded w-40"></div>
      </div>
    );
  }

  if (!github) {
    return (
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <p className="text-red-400">Failed to load GitHub data</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
      <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
        GitHub
      </h2>
      <div className="flex items-center gap-4 mt-3">
        <img
          src={github.avatar}
          alt={github.name}
          className="w-14 h-14 rounded-full"
        />
        <div>
          <p className="font-bold text-lg">{github.name}</p>
          <a
            href={github.profile_url}
            target="_blank"
            className="text-gray-400 text-sm hover:text-blue-400 transition-colors"
          >
            @{github.username}
          </a>
        </div>
      </div>
      {github.bio && (
        <p className="text-gray-400 text-sm mt-3">{github.bio}</p>
      )}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-800">
        <div className="text-center">
          <p className="text-xl font-bold">{github.public_repos}</p>
          <p className="text-gray-500 text-xs">Repos</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{github.followers}</p>
          <p className="text-gray-500 text-xs">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{github.following}</p>
          <p className="text-gray-500 text-xs">Following</p>
        </div>
      </div>
    </div>
  );
}
