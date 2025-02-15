"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, Loader2 } from "lucide-react"
import { lookupURL } from "@/app/actions/url-lookup"

export default function URLLookup() {
  const [url, setUrl] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLookupURL = async () => {
    if (!url.trim()) {
      setResult({ error: "Please enter a URL" })
      return
    }

    setIsLoading(true)
    setResult(null)
    const data = await lookupURL(url)
    setResult(data)
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">URL Lookup</h1>

      <Alert className="mb-6 bg-indigo-50 border-indigo-200 text-indigo-800">
        <InfoIcon className="h-5 w-5" />
        <AlertDescription className="text-base ml-2">
          Enter a URL to retrieve its location and hosting information.
        </AlertDescription>
      </Alert>

      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
          <CardTitle className="text-2xl">URL Information Lookup</CardTitle>
          <CardDescription className="text-gray-100 text-lg">Get detailed information about any URL</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter a URL (e.g., example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleLookupURL()
                }
              }}
              className="flex-grow text-lg border-2 border-indigo-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
            <Button
              onClick={handleLookupURL}
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Looking up
                </>
              ) : (
                "Lookup"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
            <CardTitle className="text-2xl">URL Lookup Result</CardTitle>
            <CardDescription className="text-gray-100 text-lg">URL: {result.url}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {result.error ? (
              <Alert variant="destructive">
                <AlertDescription className="text-lg">{result.error}</AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem
                  label="Valid URL"
                  value={result.is_valid ? "Yes" : "No"}
                  color={result.is_valid ? "text-green-600" : "text-red-600"}
                />
                <InfoItem label="Country" value={`${result.country} (${result.country_code})`} color="text-blue-700" />
                <InfoItem label="Region" value={`${result.region} (${result.region_code})`} color="text-indigo-700" />
                <InfoItem label="City" value={result.city} color="text-purple-700" />
                <InfoItem label="ZIP" value={result.zip} color="text-pink-700" />
                <InfoItem label="Coordinates" value={`${result.lat}, ${result.lon}`} color="text-cyan-700" />
                <InfoItem label="Timezone" value={result.timezone} color="text-teal-700" />
                <InfoItem label="ISP" value={result.isp} color="text-emerald-700" />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function InfoItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

