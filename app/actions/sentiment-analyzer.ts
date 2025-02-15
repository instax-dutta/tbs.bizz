"use server"

export async function analyzeSentiment(text: string) {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/sentiment?text=${encodeURIComponent(text)}`, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY!,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error analyzing sentiment:", error)
    return { error: "Failed to analyze sentiment" }
  }
}

