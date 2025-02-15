"use server"

interface GoldPriceResponse {
  price: number
  updated: number
}

export async function getGoldPrice() {
  try {
    const response = await fetch("https://api.api-ninjas.com/v1/goldprice", {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY!,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data: GoldPriceResponse = await response.json()
    return {
      price: data.price,
      updated: new Date(data.updated * 1000).toLocaleString(),
    }
  } catch (error) {
    console.error("Error fetching gold price:", error)
    return { error: "Failed to fetch gold price data" }
  }
}

