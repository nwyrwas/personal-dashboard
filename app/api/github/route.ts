import { NextResponse } from "next/server";

export async function GET() {
    const username = "nwyrwas";

    try {
        const res = await fetch(
            `https://api.github.com/users/${username}`,
            {
                headers: {
                    Accept: "application/vnd.github.v3+json",
                },
                next: { revalidate: 3600 }, //this caches for 1 hour
            }
        );

        if (!res.ok) {
            return NextResponse.json(
                { error: "GitHub API Error" },
                { status: 500 }
            );
        }

        const data = await res.json();

        return NextResponse.json({
            name: data.name,
            username: data.login,
            avatar: data.avatar_url,
            bio: data.bio,
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            profile_url: data.html_url,
        });
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch GitHub data"},
            { status: 500 }
        );
    }
}