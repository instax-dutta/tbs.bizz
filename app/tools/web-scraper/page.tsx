"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, FileText } from "lucide-react"
import { scrapeWebsite } from "@/app/actions/web-scraper"

interface ScrapedData {
  title: string
  metaDescription: string
  h1Headers: string[]
  links: { text: string; href: string }[]
  images: { alt: string; src: string }[]
}

export default function WebScraper() {
  const [url, setUrl] = useState("")
  const [result, setResult] = useState<{ data?: ScrapedData; error?: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleScrapeWebsite = async () => {
    setIsLoading(true)
    const data = await scrapeWebsite(url)
    setResult(data)
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-teal-800">Web Scraper</h1>

      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <CardTitle className="text-2xl">Website Content Scraper</CardTitle>
          <CardDescription className="text-gray-100 text-lg">
            Enter a URL to extract and analyze website content
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Alert className="mb-6 bg-teal-50 border-teal-200 text-teal-800">
            <FileText className="h-5 w-5" />
            <AlertDescription className="text-base ml-2">
              Retrieve HTML and plaintext data from any website URL for analysis.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter a URL (e.g., https://www.example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleScrapeWebsite()
                }
              }}
              className="flex-grow text-lg"
            />
            <Button
              onClick={handleScrapeWebsite}
              disabled={isLoading}
              className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-6"
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {isLoading ? "Scraping..." : "Scrape"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
            <CardTitle className="text-2xl">Scraped Content</CardTitle>
            <CardDescription className="text-gray-100 text-lg">URL: {url}</CardDescription>
          </CardHeader>
          <CardContent className="bg-white">
            {result.error ? (
              <Alert variant="destructive">
                <AlertDescription className="text-lg">{result.error}</AlertDescription>
              </Alert>
            ) : (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview" className="text-lg">
                    List View
                  </TabsTrigger>
                  <TabsTrigger value="links" className="text-lg">
                    Links
                  </TabsTrigger>
                  <TabsTrigger value="images" className="text-lg">
                    Images
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-xl text-teal-800">Title</h3>
                        <p className="text-gray-800 text-lg">{result.data?.title}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl text-teal-800">Meta Description</h3>
                        <p className="text-gray-800 text-lg">
                          {result.data?.metaDescription || "No meta description found"}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl text-teal-800">H1 Headers</h3>
                        <ul className="list-disc pl-5 text-gray-800 text-lg">
                          {result.data?.h1Headers.map((header, index) => (
                            <li key={index}>{header}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="links">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-2">
                      {result.data?.links.map((link, index) => (
                        <div key={index} className="border-b pb-2">
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-lg"
                          >
                            {link.text || "[No Text]"}
                          </a>
                          <p className="text-sm text-gray-600">{link.href}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="images">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="grid grid-cols-2 gap-4">
                      {result.data?.images.map((image, index) => (
                        <div key={index} className="border p-2 rounded">
                          <img
                            src={image.src || "/placeholder.svg"}
                            alt={image.alt}
                            className="w-full h-32 object-cover mb-2"
                          />
                          <p className="text-sm text-gray-800">{image.alt || "[No Alt Text]"}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

