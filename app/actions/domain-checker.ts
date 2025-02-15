"use server"

export async function checkDomain(domain: string) {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/domain?domain=${domain}`, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY!,
      },
      cache: "no-store",
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error checking domain:", error)
    return { error: "Failed to check domain availability" }
  }
}

