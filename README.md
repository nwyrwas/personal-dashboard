# Personal Dashboard

A real-time personal dashboard built with Next.js, featuring live weather updates, GitHub profile stats, a Hacker News feed, site uptime monitoring, and a dynamic clock — all wrapped in a sleek dark UI with an animated city skyline background.

[**Live Demo**](https://personal-dashboard-khaki.vercel.app/) — Check it out on Vercel!

![Dashboard Screenshot](https://raw.githubusercontent.com/nwyrwas/personal-dashboard/main/public/Image.jpg)

## Features

- **Live Clock** — Real-time clock with hours, minutes, and seconds displayed in a clean typographic layout, updates every second with the current date
- **Weather Widget** — Current temperature, conditions, and "feels like" with a dynamic search bar to check any city worldwide (powered by OpenWeatherMap API)
- **GitHub Stats** — Profile card with avatar, username link, repo count, followers, and following — cached for 1 hour to stay within API rate limits
- **Hacker News Feed** — Top 8 trending stories displayed in a two-column layout with point counts and publish dates, cached and refreshed every 30 minutes
- **Site Status Monitor** — Pings deployed projects in parallel using `Promise.all()`, displays uptime status with green/red indicators, response times in milliseconds, and an "All Systems Go" or "Issues Detected" badge
- **Time-Based Greeting** — Dynamic greeting that changes between "Good morning," "Good afternoon," and "Good evening" based on the current hour
- **Animated Background** — Looping city skyline video with a semi-transparent dark overlay and frosted glass card effects using `backdrop-blur`
- **Responsive Layout** — CSS Grid that adapts from 1 column (mobile) to 2 columns (tablet) to 3 columns (desktop)

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Runtime** | React 19 |
| **APIs** | OpenWeatherMap, GitHub REST API, Hacker News Algolia API |
| **Deployment** | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- An [OpenWeatherMap API key](https://openweathermap.org/api) (free tier)

### Installation

```bash
git clone https://github.com/nwyrwas/personal-dashboard.git
cd personal-dashboard
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
OPENWEATHER_API_KEY=your_api_key_here
```

> **Note:** The API key is only used server-side via Next.js API routes — it is never exposed to the browser.

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── api/
│   ├── weather/route.ts    # Weather API route — accepts ?city= query param, hides API key server-side
│   ├── github/route.ts     # GitHub profile API route — fetches user data, cached for 1 hour
│   ├── news/route.ts       # Hacker News API route — top 8 stories from Algolia, cached for 30 min
│   └── status/route.ts     # Status monitor — parallel health checks with HEAD requests and 5s timeout
├── components/
│   ├── Clock.tsx           # Live clock with hydration-safe rendering (defers to useEffect)
│   ├── Weather.tsx         # Weather display with controlled input for city search
│   ├── Github.tsx          # GitHub profile card with avatar, stats, and profile link
│   ├── News.tsx            # Hacker News feed in responsive 2-column grid layout
│   └── Status.tsx          # Site uptime monitor with green/red indicators and response times
├── layout.tsx              # Root layout with fonts, metadata, and global providers
├── page.tsx                # Main dashboard page with greeting, grid layout, and video background
└── globals.css             # Global styles and Tailwind CSS imports
```

## Architecture Decisions

- **Server-side API routes** keep secrets like the OpenWeatherMap key hidden from the browser — the client only calls internal `/api/*` endpoints, never external APIs directly
- **Response caching** via Next.js `revalidate` reduces external API calls — weather caches for 30 minutes, GitHub stats for 1 hour, and news for 30 minutes
- **Parallel health checks** using `Promise.all()` pings all monitored sites simultaneously instead of sequentially, keeping status checks fast regardless of how many sites are monitored
- **Hydration-safe clock** initializes state as `null` and defers to `useEffect` to avoid server/client time mismatch errors common with SSR
- **Component-based architecture** — each widget is fully isolated with its own data fetching, loading skeletons, and error handling
- **Externally hosted video** — background video is hosted via GitHub Releases to keep the repository lightweight while maintaining a rich visual experience
- **Frosted glass UI** — cards use `bg-gray-900/50` with `backdrop-blur-sm` to create translucent panels that let the animated background show through

## License

MIT
