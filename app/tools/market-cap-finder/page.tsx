"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, Loader2 } from "lucide-react"
import { getMarketCap } from "@/app/actions/market-cap-finder"

export default function MarketCapFinder() {
  const [ticker, setTicker] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetMarketCap = async () => {
    if (!ticker.trim()) {
      setResult({ error: "Please enter a ticker symbol" })
      return
    }

    setIsLoading(true)
    setResult(null)
    const data = await getMarketCap(ticker)
    setResult(data)
    setIsLoading(false)
  }

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(2)} trillion`
    } else if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)} billion`
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)} million`
    } else {
      return `$${value.toLocaleString()}`
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-green-100 via-teal-100 to-cyan-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-teal-800">Market Cap Finder</h1>

      <Alert className="mb-6 bg-teal-50 border-teal-200 text-teal-800">
        <InfoIcon className="h-5 w-5" />
        <AlertDescription className="text-base ml-2">
          Enter a stock ticker symbol to get real-time market capitalization data.
        </AlertDescription>
      </Alert>

      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <CardTitle className="text-2xl">Stock Ticker Lookup</CardTitle>
          <CardDescription className="text-gray-100 text-lg">
            Get market capitalization for any publicly traded company
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter a ticker symbol (e.g., AAPL)"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleGetMarketCap()
                }
              }}
              className="flex-grow text-lg border-2 border-teal-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-200"
            />
            <Button
              onClick={handleGetMarketCap}
              disabled={isLoading}
              className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Loading
                </>
              ) : (
                "Get Market Cap"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
            <CardTitle className="text-2xl">Market Cap Information</CardTitle>
            <CardDescription className="text-gray-100 text-lg">Ticker: {result.ticker}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {result.error ? (
              <Alert variant="destructive">
                <AlertDescription className="text-lg">{result.error}</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                <InfoItem label="Company Name" value={result.name} color="text-green-700" />
                <InfoItem label="Market Cap" value={formatMarketCap(result.marketCap)} color="text-teal-700" />
                <InfoItem label="Last Updated" value={result.updated} color="text-cyan-700" />
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
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

