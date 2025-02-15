"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, Loader2, TrendingUp } from "lucide-react"
import { getGoldPrice } from "@/app/actions/gold-price"

export default function GoldPrice() {
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchGoldPrice = async () => {
    setIsLoading(true)
    setResult(null)
    try {
      const data = await getGoldPrice()
      setResult(data)
    } catch (error) {
      setResult({ error: "Failed to fetch gold price" })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGoldPrice()
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-amber-800">Gold Price Tracker</h1>

      <Alert className="mb-6 bg-amber-50 border-amber-200 text-amber-800">
        <InfoIcon className="h-5 w-5" />
        <AlertDescription className="text-base ml-2">
          Real-time gold futures price from the Chicago Mercantile Exchange (CME).
        </AlertDescription>
      </Alert>

      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white">
          <CardTitle className="text-2xl">Live Gold Price</CardTitle>
          <CardDescription className="text-gray-100 text-lg">Current market value of gold</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Button
            onClick={fetchGoldPrice}
            disabled={isLoading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white text-lg mb-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Updating
              </>
            ) : (
              <>
                <TrendingUp className="mr-2 h-5 w-5" />
                Refresh Price
              </>
            )}
          </Button>

          {result && (
            <div className="bg-gradient-to-r from-yellow-200 to-amber-200 p-6 rounded-lg shadow-inner">
              {result.error ? (
                <p className="text-red-600 text-lg font-semibold">{result.error}</p>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-amber-800">Current Price:</span>
                    <span className="text-4xl font-bold text-amber-600">${result.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-amber-700">Per troy ounce</span>
                    <span className="text-sm text-amber-700">USD</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Last updated: {result.updated}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <CardTitle className="text-xl">About Gold Pricing</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-gray-700 text-base">
            Gold prices are typically quoted in US dollars per troy ounce. The price of gold can be influenced by
            various factors including economic conditions, geopolitical events, and market sentiment. This tool provides
            real-time data from the Chicago Mercantile Exchange (CME), one of the world's leading derivatives
            marketplaces.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

