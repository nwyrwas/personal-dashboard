import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "Chicago";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=imperial`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || "City not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      city: data.name,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 500 }
    );
  }
}
