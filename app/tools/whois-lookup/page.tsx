"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, Loader2 } from "lucide-react"
import { lookupDomain } from "@/app/actions/whois-lookup"

export default function WhoIsLookup() {
  const [domain, setDomain] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLookupDomain = async () => {
    if (!domain.trim()) {
      setResult({ error: "Please enter a domain name" })
      return
    }

    setIsLoading(true)
    setResult(null)
    const data = await lookupDomain(domain)
    setResult(data)
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">WHOIS Lookup</h1>

      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <CardTitle className="text-2xl">Domain Information Lookup</CardTitle>
          <CardDescription className="text-gray-100 text-lg">
            Enter a domain name to retrieve detailed WHOIS information
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Alert className="mb-6 bg-indigo-50 border-indigo-200 text-indigo-800">
            <InfoIcon className="h-5 w-5" />
            <AlertDescription className="text-base ml-2">
              Enter a domain name to retrieve detailed registration information.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter a domain name (e.g., example.com)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleLookupDomain()
                }
              }}
              className="flex-grow text-lg"
            />
            <Button
              onClick={handleLookupDomain}
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-6"
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {isLoading ? "Looking up..." : "Lookup"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardTitle className="text-2xl">WHOIS Information</CardTitle>
            <CardDescription className="text-gray-100 text-lg">Domain: {result.domainName}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {result.error ? (
              <Alert variant="destructive">
                <AlertDescription className="text-lg">{result.error}</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h3 className="font-semibold text-xl mb-2 text-indigo-800">Domain Information</h3>
                  <p className="text-gray-800 text-lg">
                    <strong>Registrar:</strong> {result.registrar}
                  </p>
                  <p className="text-gray-800 text-lg">
                    <strong>Created Date:</strong> {result.createdDate}
                  </p>
                  <p className="text-gray-800 text-lg">
                    <strong>Updated Date:</strong> {result.updatedDate}
                  </p>
                  <p className="text-gray-800 text-lg">
                    <strong>Expiry Date:</strong> {result.expiryDate}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-xl mb-2 text-purple-800">Registrant Information</h3>
                  <p className="text-gray-800 text-lg">
                    <strong>Name:</strong> {result.registrant.name}
                  </p>
                  <p className="text-gray-800 text-lg">
                    <strong>Organization:</strong> {result.registrant.organization}
                  </p>
                  <p className="text-gray-800 text-lg">
                    <strong>Country:</strong> {result.registrant.country}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-pink-200">
                  <h3 className="font-semibold text-xl mb-2 text-pink-800">Name Servers</h3>
                  <ul className="list-disc list-inside text-gray-800 text-lg">
                    {result.nameServers.map((ns: string, index: number) => (
                      <li key={index}>{ns}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

