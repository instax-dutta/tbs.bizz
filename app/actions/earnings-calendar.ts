"use server"

interface EarningsResult {
  pricedate: string
  ticker: string
  actual_eps: number | null
  estimated_eps: number | null
  actual_revenue: number | null
  estimated_revenue: number | null
}

export async function getEarningsCalendar(ticker: string, showUpcoming = false) {
  if (!ticker) {
    return { error: "Ticker symbol is required" }
  }

  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/earningscalendar?ticker=${ticker}&show_upcoming=${showUpcoming}`,
      {
        headers: {
          "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY!,
        },
        cache: "no-store",
      },
    )

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data: EarningsResult[] = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching earnings calendar:", error)
    return { error: "Failed to fetch earnings calendar data" }
  }
}

