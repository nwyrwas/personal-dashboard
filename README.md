# Personal Dashboard

A real-time personal dashboard built with Next.js, featuring live weather updates, GitHub profile stats, a Hacker News feed, and a dynamic clock — all in a sleek dark UI.

![Dashboard Screenshot](public/Image.png)

## Features

- **Live Clock** — Real-time clock with date display, updates every second
- **Weather Widget** — Current weather with search functionality to check any city (powered by OpenWeatherMap)
- **GitHub Stats** — Profile overview with avatar, bio, repo count, followers, and following
- **Hacker News Feed** — Top 8 trending stories from Hacker News, cached and refreshed every 30 minutes
- **Time-Based Greeting** — Dynamic greeting that changes based on time of day
- **Responsive Layout** — Adapts from mobile (1 column) to desktop (3 columns)

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **APIs:** OpenWeatherMap, GitHub REST API, Hacker News Algolia API
- **Runtime:** React 19

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

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── api/
│   ├── weather/route.ts    # Weather API route (hides API key server-side)
│   ├── github/route.ts     # GitHub profile API route (cached 1 hour)
│   └── news/route.ts       # Hacker News API route (cached 30 min)
├── components/
│   ├── Clock.tsx           # Live clock with hydration-safe rendering
│   ├── Weather.tsx         # Weather display with city search
│   ├── Github.tsx          # GitHub profile card with stats
│   └── News.tsx            # Hacker News feed in 2-column layout
├── layout.tsx              # Root layout with fonts and metadata
├── page.tsx                # Main dashboard page
└── globals.css             # Global styles and Tailwind imports
```

## Architecture Decisions

- **Server-side API routes** keep secrets like the OpenWeatherMap key hidden from the browser
- **Response caching** (`revalidate`) reduces external API calls — weather caches for 30 min, GitHub stats for 1 hour
- **Component-based architecture** — each widget is isolated with its own data fetching, loading states, and error handling
- **Hydration-safe clock** — starts with a placeholder to avoid server/client time mismatch errors

## License

MIT
