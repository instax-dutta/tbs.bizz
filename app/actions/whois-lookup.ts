"use server"

interface WhoisResponse {
  status: boolean
  domain_name: string
  query_time: string
  whois_server: string
  domain_registered: string
  create_date: string
  update_date: string
  expiry_date: string
  domain_registrar: {
    iana_id: string
    registrar_name: string
    whois_server: string
    website_url: string
    email_address: string
    phone_number: string
  }
  registrant_contact: {
    name: string
    company: string
    email_address: string
    phone: string
    country_name: string
  }
  administrative_contact: {
    name: string
    company: string
    email_address: string
    phone: string
    country_name: string
  }
  technical_contact: {
    name: string
    company: string
    email_address: string
    phone: string
    country_name: string
  }
  name_servers: string[]
  domain_status: string[]
}

export async function lookupDomain(domain: string) {
  if (!domain) {
    return { error: "Domain name is required" }
  }

  const apiKey = process.env.WHOISFREAKS_API_KEY
  if (!apiKey) {
    return { error: "WhoisFreaks API key is not configured" }
  }

  try {
    const response = await fetch(
      `https://api.whoisfreaks.com/v1.0/whois?apiKey=${apiKey}&whois=live&domainName=${domain}`,
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("WhoisFreaks API error:", errorText)
      throw new Error(`API Error: ${response.status} - ${errorText}`)
    }

    const data: WhoisResponse = await response.json()

    return {
      domainName: data.domain_name,
      registrar: data.domain_registrar.registrar_name,
      registrarUrl: data.domain_registrar.website_url,
      createdDate: data.create_date,
      updatedDate: data.update_date,
      expiryDate: data.expiry_date,
      registrant: {
        name: data.registrant_contact.name,
        organization: data.registrant_contact.company,
        email: data.registrant_contact.email_address,
        phone: data.registrant_contact.phone,
        country: data.registrant_contact.country_name,
      },
      nameServers: data.name_servers,
      domainStatus: data.domain_status,
    }
  } catch (error) {
    console.error("Error looking up domain:", error)
    return { error: "Failed to retrieve WHOIS information. Please try again later." }
  }
}

