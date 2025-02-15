"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, Loader2 } from "lucide-react"
import { checkDomain } from "@/app/actions/domain-checker"

export default function DomainChecker() {
  const [domain, setDomain] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckDomain = async () => {
    const domainToCheck = domain.endsWith(".com") ? domain : `${domain}.com`
    setIsLoading(true)
    const data = await checkDomain(domainToCheck)
    setResult(data)
    setIsLoading(false)
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-800">Domain Availability Checker</h1>

      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardTitle className="text-2xl">Check Domain Availability</CardTitle>
          <CardDescription className="text-gray-100 text-lg">
            Enter a domain name to check its availability
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Alert className="mb-6 bg-blue-50 border-blue-200 text-blue-800">
            <InfoIcon className="h-5 w-5" />
            <AlertDescription className="text-base ml-2">
              Currently, we only support checking .com domain extensions.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter a domain name (e.g., example)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleCheckDomain()
                }
              }}
              className="flex-grow text-lg"
            />
            <Button
              onClick={handleCheckDomain}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-6"
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {isLoading ? "Checking..." : "Check"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
            <CardTitle className="text-2xl">Domain Check Result</CardTitle>
            <CardDescription className="text-gray-100 text-lg">Domain: {result.domain}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {result.error ? (
              <p className="text-red-500 text-lg">{result.error}</p>
            ) : (
              <div className="space-y-4 text-lg">
                <p className="text-xl font-semibold">
                  Status:{" "}
                  {result.available ? (
                    <span className="text-green-600">Available</span>
                  ) : (
                    <span className="text-red-600">Not Available</span>
                  )}
                </p>
                {!result.available && (
                  <>
                    <p className="text-gray-700">
                      <strong>Creation Date:</strong> {formatDate(result.creation_date)}
                    </p>
                    <p className="text-gray-700">
                      <strong>Registrar:</strong> {result.registrar}
                    </p>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

