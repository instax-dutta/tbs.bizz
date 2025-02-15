"use server"

export async function getHelicopterInfo(model: string) {
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/aircraft?type=helicopter&model=${encodeURIComponent(model)}`,
      {
        headers: {
          "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY!,
        },
        cache: "no-store",
      },
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching helicopter info:", error)
    return { error: "Failed to fetch helicopter information" }
  }
}

