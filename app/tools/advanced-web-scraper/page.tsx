"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, Loader2 } from "lucide-react"
import { scrapeWebsite, getScrapingResult } from "@/app/actions/advanced-web-scraper"

export default function AdvancedWebScraper() {
  const [url, setUrl] = useState("")
  const [aiPrompt, setAiPrompt] = useState("")
  const [jsonSchema, setJsonSchema] = useState("")
  const [jobId, setJobId] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleScrape = async () => {
    if (!url.trim()) {
      setResult({ error: "Please enter a URL" })
      return
    }

    setIsLoading(true)
    setResult(null)
    try {
      const job = await scrapeWebsite(url, aiPrompt || undefined, jsonSchema ? JSON.parse(jsonSchema) : undefined)
      setJobId(job.jobId)

      // In a real-world scenario, you'd implement polling or websockets here
      // For demonstration, we'll just wait a bit and then fetch the result
      setTimeout(async () => {
        const data = await getScrapingResult(job.jobId)
        setResult(data)
        setIsLoading(false)
      }, 2000)
    } catch (error) {
      setResult({ error: "Failed to scrape website" })
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Advanced Web Scraper</h1>

      <Alert className="mb-6 bg-secondary/10">
        <InfoIcon className="h-4 w-4 text-secondary" />
        <AlertDescription>Enter a URL and optional AI prompt or JSON schema for advanced scraping.</AlertDescription>
      </Alert>

      <div className="space-y-4 mb-6">
        <Input type="text" placeholder="Enter a URL to scrape" value={url} onChange={(e) => setUrl(e.target.value)} />
        <Textarea
          placeholder="Enter an AI prompt (optional)"
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
        />
        <Textarea
          placeholder="Enter a JSON schema (optional)"
          value={jsonSchema}
          onChange={(e) => setJsonSchema(e.target.value)}
        />
        <Button onClick={handleScrape} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scraping...
            </>
          ) : (
            "Scrape Website"
          )}
        </Button>
      </div>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Scraping Result</CardTitle>
            <CardDescription>URL: {result.url}</CardDescription>
          </CardHeader>
          <CardContent>
            {result.error ? (
              <p className="text-destructive">{result.error}</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Raw Content:</h3>
                  <p className="text-sm text-muted-foreground">{result.content.substring(0, 200)}...</p>
                </div>
                {result.structuredData && (
                  <div>
                    <h3 className="font-semibold mb-2">Structured Data:</h3>
                    <pre className="text-sm bg-muted p-2 rounded-md overflow-x-auto">
                      {JSON.stringify(result.structuredData, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

