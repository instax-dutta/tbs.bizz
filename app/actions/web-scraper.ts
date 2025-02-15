"use server"

import { load } from "cheerio"

interface ScrapedData {
  title: string
  metaDescription: string
  h1Headers: string[]
  links: { text: string; href: string }[]
  images: { alt: string; src: string }[]
}

export async function scrapeWebsite(url: string) {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/webscraper?url=${encodeURIComponent(url)}`, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY!,
      },
      cache: "no-store",
    })
    const htmlContent = await response.text()

    const $ = load(htmlContent)

    const scrapedData: ScrapedData = {
      title: $("title").text(),
      metaDescription: $('meta[name="description"]').attr("content") || "",
      h1Headers: $("h1")
        .map((i, el) => $(el).text())
        .get(),
      links: $("a")
        .map((i, el) => ({ text: $(el).text(), href: $(el).attr("href") || "" }))
        .get(),
      images: $("img")
        .map((i, el) => ({ alt: $(el).attr("alt") || "", src: $(el).attr("src") || "" }))
        .get(),
    }

    return { data: scrapedData }
  } catch (error) {
    console.error("Error scraping website:", error)
    return { error: "Failed to scrape website" }
  }
}

