"use server"

export async function fetchGDPData(country: string) {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/gdp?country=${encodeURIComponent(country)}`, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY!,
      },
      cache: "no-store",
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching GDP data:", error)
    return { error: "Failed to fetch GDP data" }
  }
}

