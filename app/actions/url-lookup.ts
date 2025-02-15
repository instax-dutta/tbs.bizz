"use server"

interface URLLookupResponse {
  is_valid: boolean
  country: string
  country_code: string
  region_code: string
  region: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  url: string
}

export async function lookupURL(url: string) {
  if (!url) {
    return { error: "URL is required" }
  }

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/urllookup?url=${encodeURIComponent(url)}`, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY!,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data: URLLookupResponse = await response.json()
    return data
  } catch (error) {
    console.error("Error looking up URL:", error)
    return { error: "Failed to lookup URL information" }
  }
}

