"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExternalLink, Globe, Link2, AlertCircle, Loader2 } from "lucide-react"
import { monitorBrand } from "@/app/actions/brand-monitor"

interface BrandMention {
  title: string
  url: string
  description: string
}

export default function BrandMonitor() {
  const [brand, setBrand] = useState("google")
  const [result, setResult] = useState<{
    mentions?: BrandMention[]
    message?: string
    error?: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleMonitorBrand = async () => {
    if (!brand.trim()) {
      setResult({ error: "Please enter a brand name" })
      return
    }

    setIsLoading(true)
    setResult(null)
    const data = await monitorBrand(brand)
    setResult(data)
    setIsLoading(false)
  }

  const getDomainFromUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname
      return domain.replace("www.", "")
    } catch {
      return url
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Brand Monitor</h1>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Monitor newly registered, updated, or dropped domains containing your brand name. Results show domain
          activities in the last 24 hours.
        </AlertDescription>
      </Alert>

      <div className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Enter a brand name (e.g., google)"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <Button onClick={handleMonitorBrand} disabled={isLoading} className="min-w-[100px]">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scanning
            </>
          ) : (
            "Monitor"
          )}
        </Button>
      </div>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Brand Monitoring Results
              {result.mentions && (
                <Badge variant="secondary">
                  {result.mentions.length} domain{result.mentions.length !== 1 ? "s" : ""}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>{result.message || `Results for "${brand}"`}</CardDescription>
          </CardHeader>
          <CardContent>
            {result.error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{result.error}</AlertDescription>
                {result.error.includes("API key") && (
                  <AlertDescription className="mt-2">
                    Please check your API key configuration and ensure you have sufficient DRS credits.
                  </AlertDescription>
                )}
              </Alert>
            ) : result.mentions && result.mentions.length > 0 ? (
              <Tabs defaultValue="list" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="actions">Action Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="list">
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {result.mentions.map((mention, index) => (
                        <Card key={index}>
                          <CardContent className="pt-6">
                            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{mention.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-3">{mention.description}</p>
                            <div className="flex items-center gap-2 text-sm text-primary">
                              <Globe className="h-4 w-4" />
                              <a
                                href={mention.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline flex items-center gap-1"
                              >
                                {getDomainFromUrl(mention.url)}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="actions">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="grid gap-4">
                        <h3 className="font-semibold">Domain Action Analysis</h3>
                        <div className="space-y-2">
                          {Object.entries(
                            result.mentions.reduce((acc: { [key: string]: number }, mention) => {
                              const action = mention.description.split("|")[0].split(":")[1].trim()
                              acc[action] = (acc[action] || 0) + 1
                              return acc
                            }, {}),
                          )
                            .sort(([, a], [, b]) => b - a)
                            .map(([action, count], index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between py-2 border-b last:border-0"
                              >
                                <div className="flex items-center gap-2">
                                  <Link2 className="h-4 w-4 text-muted-foreground" />
                                  <span>{action}</span>
                                </div>
                                <Badge variant="secondary">
                                  {count} domain{count !== 1 ? "s" : ""}
                                </Badge>
                              </div>
                            ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>No domains found matching your criteria.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

