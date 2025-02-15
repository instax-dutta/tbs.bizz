"use server"

export async function getAircraftInfo(model: string) {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/aircraft?model=${encodeURIComponent(model)}`, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY!,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching aircraft info:", error)
    return { error: "Failed to fetch aircraft information" }
  }
}

