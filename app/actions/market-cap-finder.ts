"use server"

interface MarketCapResponse {
  ticker: string
  name: string
  market_cap: number
  updated: number
}

export async function getMarketCap(ticker: string) {
  if (!ticker) {
    return { error: "Ticker symbol is required" }
  }

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/marketcap?ticker=${ticker}`, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY!,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data: MarketCapResponse = await response.json()

    return {
      ticker: data.ticker,
      name: data.name,
      marketCap: data.market_cap,
      updated: new Date(data.updated * 1000).toLocaleString(),
    }
  } catch (error) {
    console.error("Error fetching market cap:", error)
    return { error: "Failed to fetch market cap data" }
  }
}

