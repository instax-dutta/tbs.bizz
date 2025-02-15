"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Globe } from "lucide-react"
import { lookupIP } from "@/app/actions/ip-lookup"

export default function IPLookup() {
  const [ip, setIp] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLookupIP = async () => {
    if (!ip.trim()) {
      setResult({ error: "Please enter an IP address" })
      return
    }

    setIsLoading(true)
    setResult(null)
    try {
      const data = await lookupIP(ip)
      setResult(data)
    } catch (error) {
      console.error("Error in handleLookupIP:", error)
      setResult({ error: "An unexpected error occurred. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">IP Lookup</h1>

      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          <CardTitle className="text-2xl">IP Information Lookup</CardTitle>
          <CardDescription className="text-gray-100 text-lg">
            Enter an IP address to retrieve detailed information
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Alert className="mb-6 bg-blue-50 border-blue-200 text-blue-800">
            <Globe className="h-5 w-5" />
            <AlertDescription className="text-base ml-2">
              Discover geographical and network details for any IP address.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter an IP address (e.g., 8.8.8.8)"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleLookupIP()
                }
              }}
              className="flex-grow text-lg"
            />
            <Button
              onClick={handleLookupIP}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6"
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {isLoading ? "Looking up..." : "Lookup"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <CardTitle className="text-2xl">IP Information</CardTitle>
            <CardDescription className="text-gray-100 text-lg">IP: {ip}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {result.error ? (
              <Alert variant="destructive">
                <AlertDescription className="text-lg">{result.error}</AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-2 gap-4 text-lg">
                <div className="space-y-2">
                  <p className="text-blue-700">
                    <strong>City:</strong> {result.city}
                  </p>
                  <p className="text-blue-700">
                    <strong>Region:</strong> {result.region}
                  </p>
                  <p className="text-blue-700">
                    <strong>Country:</strong> {result.country}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-purple-700">
                    <strong>Location:</strong> {result.loc}
                  </p>
                  <p className="text-purple-700">
                    <strong>Organization:</strong> {result.org}
                  </p>
                  <p className="text-purple-700">
                    <strong>Timezone:</strong> {result.timezone}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

