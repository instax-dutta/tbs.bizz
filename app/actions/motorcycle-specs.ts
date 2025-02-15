"use server"

export async function getMotorcycleSpecs(make: string, model: string) {
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/motorcycles?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}`,
      {
        headers: {
          "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY!,
        },
      },
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching motorcycle specs:", error)
    return { error: "Failed to fetch motorcycle specifications" }
  }
}

