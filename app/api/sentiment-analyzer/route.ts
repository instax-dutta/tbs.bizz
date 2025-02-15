import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get("text")

  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/sentiment?text=${encodeURIComponent(text)}`, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY!,
      },
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error analyzing sentiment:", error)
    return NextResponse.json({ error: "Failed to analyze sentiment" }, { status: 500 })
  }
}

