import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const country = searchParams.get("country")

  if (!country) {
    return NextResponse.json({ error: "Country is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/gdp?country=${encodeURIComponent(country)}`, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY!,
      },
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching GDP data:", error)
    return NextResponse.json({ error: "Failed to fetch GDP data" }, { status: 500 })
  }
}

