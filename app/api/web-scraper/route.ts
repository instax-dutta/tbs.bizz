import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/webscraper?url=${encodeURIComponent(url)}`, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY!,
      },
    })
    const data = await response.text()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error scraping website:", error)
    return NextResponse.json({ error: "Failed to scrape website" }, { status: 500 })
  }
}

