"use server"

export async function validatePhone(phone: string) {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/validatephone?number=${encodeURIComponent(phone)}`, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY!,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error validating phone:", error)
    return { error: "Failed to validate phone number" }
  }
}

