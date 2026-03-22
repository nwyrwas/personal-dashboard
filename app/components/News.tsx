"use client";

import { useState, useEffect } from "react";

interface Article {
  title: string;
  url: string;
  time: string;
  points: number;
}

export default function News() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-24 mb-4"></div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-700 rounded w-full mb-3"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 w-full">
      <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
        Hacker News
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {articles.map((article, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-gray-600 text-sm font-mono min-w-[20px]">
              {index + 1}.
            </span>
            <div>
              <a
                href={article.url}
                target="_blank"
                className="text-sm text-gray-200 hover:text-blue-400 transition-colors leading-snug"
              >
                {article.title}
              </a>
              <p className="text-xs text-gray-500 mt-1">
                {article.points} points · {article.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
