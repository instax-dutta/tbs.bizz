"use server"

interface BrandAlertResponse {
  domainsCount: number
  domainsList?: Array<{
    domainName: string
    action: "added" | "updated" | "dropped" | "discovered"
    date: string
  }>
  message?: string
}

export async function monitorBrand(brand: string) {
  if (!brand) {
    return { error: "Brand name is required" }
  }

  const apiKey = process.env.NEXT_PUBLIC_WHOISXML_API_KEY || "at_Z7TNoVvQIGsLXN58XLpGKx5RQ0iUH"

  try {
    // Get yesterday's date as default
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const formattedDate = yesterday.toISOString().split("T")[0]

    const response = await fetch("https://brand-alert.whoisxmlapi.com/api/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authentication-Token": apiKey,
      },
      body: JSON.stringify({
        apiKey: apiKey,
        sinceDate: formattedDate,
        mode: "purchase",
        withTypos: false,
        responseFormat: "json",
        punycode: true,
        includeSearchTerms: [brand.toLowerCase()],
      }),
      cache: "no-store",
    })

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Access restricted. Please check your API key and DRS credits balance.")
      }
      const errorText = await response.text()
      throw new Error(`API Error: ${response.status} - ${errorText}`)
    }

    const data: BrandAlertResponse = await response.json()

    if (data.message) {
      throw new Error(data.message)
    }

    // If no domains found, return empty array
    if (!data.domainsList || data.domainsList.length === 0) {
      return {
        mentions: [],
        message: `No new domains found containing "${brand}" since ${formattedDate}`,
      }
    }

    // Transform the API response into the expected format
    const mentions = data.domainsList.map((domain) => ({
      title: domain.domainName,
      url: `http://${domain.domainName}`,
      description: `Action: ${domain.action} | Date: ${new Date(domain.date).toLocaleDateString()}`,
    }))

    return {
      mentions,
      message: `Found ${data.domainsCount} new domains containing "${brand}" since ${formattedDate}`,
    }
  } catch (error) {
    console.error("Error monitoring brand:", error)
    return {
      error: error instanceof Error ? error.message : "Failed to monitor brand. Please try again later.",
    }
  }
}

