import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const domain = searchParams.get("domain")

  if (!domain) {
    return NextResponse.json({ error: "Domain is required" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${process.env.NEXT_PUBLIC_WHOISXML_API_KEY}&domainName=${domain}&credits=DA`,
    )
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error checking domain:", error)
    return NextResponse.json({ error: "Failed to check domain availability" }, { status: 500 })
  }
}

