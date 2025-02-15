"use server"

export async function getAirlineData(name: string) {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/airlines?name=${encodeURIComponent(name)}`, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY!,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching airline data:", error)
    return { error: "Failed to fetch airline data" }
  }
}

