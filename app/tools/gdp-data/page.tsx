"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, TrendingUp } from "lucide-react"
import { fetchGDPData } from "@/app/actions/gdp-data"

export default function GDPData() {
  const [country, setCountry] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFetchGDPData = async () => {
    if (!country.trim()) return
    setIsLoading(true)
    const data = await fetchGDPData(country)
    setResult(data)
    setIsLoading(false)
  }

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">GDP Data Explorer</h1>

      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <CardTitle className="text-2xl">Country GDP Information</CardTitle>
          <CardDescription className="text-gray-100 text-lg">
            Explore economic data for countries worldwide
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Alert className="mb-6 bg-indigo-50 border-indigo-200 text-indigo-800">
            <TrendingUp className="h-5 w-5" />
            <AlertDescription className="text-base ml-2">
              Access current and historical GDP data for countries around the world.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter a country name (e.g., Canada)"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleFetchGDPData()
                }
              }}
              className="flex-grow text-lg border-2 border-indigo-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
            <Button
              onClick={handleFetchGDPData}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-6"
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {isLoading ? "Fetching..." : "Fetch Data"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardTitle className="text-2xl">GDP Data for {country}</CardTitle>
            <CardDescription className="text-gray-100 text-lg">Historical economic indicators</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {result.error ? (
              <Alert variant="destructive" className="m-6">
                <AlertDescription className="text-lg">{result.error}</AlertDescription>
              </Alert>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-indigo-100">
                      <TableHead className="font-bold text-lg text-indigo-800 py-3">Year</TableHead>
                      <TableHead className="font-bold text-lg text-indigo-800 py-3">GDP Growth (%)</TableHead>
                      <TableHead className="font-bold text-lg text-indigo-800 py-3">
                        GDP Nominal (Billion USD)
                      </TableHead>
                      <TableHead className="font-bold text-lg text-indigo-800 py-3">
                        GDP Per Capita Nominal (USD)
                      </TableHead>
                      <TableHead className="font-bold text-lg text-indigo-800 py-3">GDP PPP (Billion USD)</TableHead>
                      <TableHead className="font-bold text-lg text-indigo-800 py-3">GDP Per Capita PPP (USD)</TableHead>
                      <TableHead className="font-bold text-lg text-indigo-800 py-3">GDP PPP Share (%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.map((item: any, index: number) => (
                      <TableRow key={index} className={index % 2 === 0 ? "bg-purple-50" : "bg-white"}>
                        <TableCell className="text-lg font-semibold text-purple-800 py-3">{item.year}</TableCell>
                        <TableCell
                          className={`text-lg font-medium py-3 ${item.gdp_growth > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {item.gdp_growth.toFixed(2)}%
                        </TableCell>
                        <TableCell className="text-lg text-gray-800 py-3">{item.gdp_nominal.toFixed(3)}</TableCell>
                        <TableCell className="text-lg text-gray-800 py-3">
                          {item.gdp_per_capita_nominal.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-lg text-gray-800 py-3">{item.gdp_ppp.toFixed(3)}</TableCell>
                        <TableCell className="text-lg text-gray-800 py-3">
                          {item.gdp_per_capita_ppp.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-lg text-gray-800 py-3">{item.gdp_ppp_share.toFixed(3)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

