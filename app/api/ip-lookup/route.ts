import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ip = searchParams.get("ip")

  if (!ip) {
    return NextResponse.json({ error: "IP address is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error looking up IP:", error)
    return NextResponse.json({ error: "Failed to retrieve IP information" }, { status: 500 })
  }
}

