"use server"

const IPINFO_TOKEN = process.env.IPINFO_TOKEN

export async function lookupIP(ip: string) {
  if (!ip.trim()) {
    return { error: "IP address is required" }
  }

  if (!IPINFO_TOKEN) {
    console.error("IPINFO_TOKEN environment variable is not set")
    return { error: "API configuration error" }
  }

  try {
    const apiUrl = `https://ipinfo.io/${encodeURIComponent(ip)}/json?token=${IPINFO_TOKEN}`
    console.log(`Calling API: ${apiUrl}`)

    const response = await fetch(apiUrl)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API Error (${response.status}):`, errorText)
      return { error: `API Error: ${response.status} - ${errorText}` }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error looking up IP:", error)
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" }
  }
}

