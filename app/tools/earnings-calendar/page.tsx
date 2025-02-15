"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { getEarningsCalendar } from "@/app/actions/earnings-calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function EarningsCalendar() {
  const [ticker, setTicker] = useState("")
  const [showUpcoming, setShowUpcoming] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetEarnings = async () => {
    if (!ticker.trim()) {
      setResult({ error: "Please enter a ticker symbol" })
      return
    }

    setIsLoading(true)
    setResult(null)
    const data = await getEarningsCalendar(ticker, showUpcoming)
    setResult(data)
    setIsLoading(false)
  }

  const formatCurrency = (value: number | null) => {
    if (value === null) return "N/A"
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-amber-800">Earnings Calendar</h1>

      <Alert className="mb-6 bg-amber-50 border-amber-200 text-amber-800">
        <InfoIcon className="h-5 w-5" />
        <AlertDescription className="text-base ml-2">Enter a ticker symbol to retrieve earnings data.</AlertDescription>
      </Alert>

      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <CardTitle className="text-2xl">Earnings Lookup</CardTitle>
          <CardDescription className="text-gray-100 text-lg">
            Get historical and upcoming earnings data for any stock
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              type="text"
              placeholder="Enter a ticker symbol (e.g., AAPL)"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleGetEarnings()
                }
              }}
              className="flex-grow text-lg border-2 border-amber-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showUpcoming"
                checked={showUpcoming}
                onCheckedChange={(checked) => setShowUpcoming(checked as boolean)}
              />
              <label
                htmlFor="showUpcoming"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show Upcoming
              </label>
            </div>
            <Button
              onClick={handleGetEarnings}
              disabled={isLoading}
              className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Loading
                </>
              ) : (
                "Get Earnings"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <CardTitle className="text-2xl">Earnings Calendar</CardTitle>
            <CardDescription className="text-gray-100 text-lg">Ticker: {ticker}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {Array.isArray(result) ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-amber-100">
                      <TableHead className="font-bold text-lg text-amber-800 py-3">Date</TableHead>
                      <TableHead className="font-bold text-lg text-amber-800 py-3">EPS (Actual)</TableHead>
                      <TableHead className="font-bold text-lg text-amber-800 py-3">EPS (Est.)</TableHead>
                      <TableHead className="font-bold text-lg text-amber-800 py-3">Revenue (Actual)</TableHead>
                      <TableHead className="font-bold text-lg text-amber-800 py-3">Revenue (Est.)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.map((item, index) => (
                      <TableRow key={index} className={index % 2 === 0 ? "bg-amber-50" : "bg-white"}>
                        <TableCell className="text-base font-medium text-amber-800 py-3">
                          {new Date(item.pricedate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-base py-3">
                          <EarningsValue value={item.actual_eps} type="eps" />
                        </TableCell>
                        <TableCell className="text-base py-3">
                          <EarningsValue value={item.estimated_eps} type="eps" />
                        </TableCell>
                        <TableCell className="text-base py-3">
                          <EarningsValue value={item.actual_revenue} type="revenue" />
                        </TableCell>
                        <TableCell className="text-base py-3">
                          <EarningsValue value={item.estimated_revenue} type="revenue" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <Alert variant="destructive">
                <AlertDescription className="text-lg">{result.error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function EarningsValue({ value, type }: { value: number | null; type: "eps" | "revenue" }) {
  if (value === null) return <span className="text-gray-500">N/A</span>

  const formattedValue = type === "eps" ? value.toFixed(2) : formatCurrency(value)
  const color = type === "eps" ? (value >= 0 ? "text-green-600" : "text-red-600") : "text-blue-600"

  return <span className={`font-semibold ${color}`}>{formattedValue}</span>
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
}

