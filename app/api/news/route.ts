import { NextResponse } from "next/server";

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
}

export async function GET() {
  try {
    // Using a public RSS-to-JSON service to fetch Hacker News
    const res = await fetch(
      "https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=8",
      { next: { revalidate: 1800 } } // cache for 30 minutes
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch news" },
        { status: 500 }
      );
    }

    const data = await res.json();

    const articles = data.hits.map(
      (item: { title: string; url: string; created_at: string; points: number }) => ({
        title: item.title,
        url: item.url,
        time: new Date(item.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        points: item.points,
      })
    );

    return NextResponse.json({ articles });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
