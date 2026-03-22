import { NextResponse } from "next/server";

interface Site {
  name: string;
  url: string;
}

interface SiteStatus {
  name: string;
  url: string;
  status: "up" | "down";
  responseTime: number;
}

const sites: Site[] = [
  { name: "Personal Dashboard", url: "https://personal-dashboard-khaki.vercel.app" },
  { name: "GitHub", url: "https://github.com/nwyrwas" },
  { name: "LedgerIQ", url: "https://your-ledgeriq-url.vercel.app" },
  { name: "Neural-OS", url: "https://your-neural-os-url.vercel.app" },
];

export async function GET() {
  try {
    const results: SiteStatus[] = await Promise.all(
      sites.map(async (site) => {
        const start = Date.now();
        try {
          const res = await fetch(site.url, {
            method: "HEAD",
            signal: AbortSignal.timeout(5000),
          });
          return {
            name: site.name,
            url: site.url,
            status: res.ok ? ("up" as const) : ("down" as const),
            responseTime: Date.now() - start,
          };
        } catch {
          return {
            name: site.name,
            url: site.url,
            status: "down" as const,
            responseTime: Date.now() - start,
          };
        }
      })
    );

    return NextResponse.json({ sites: results });
  } catch {
    return NextResponse.json(
      { error: "Failed to check status" },
      { status: 500 }
    );
  }
}
