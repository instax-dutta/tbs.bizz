"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plane } from "lucide-react"
import { getAirlineData } from "@/app/actions/airline-data"

export default function AirlineData() {
  const [name, setName] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetAirlineData = async () => {
    if (!name.trim()) return
    setIsLoading(true)
    const data = await getAirlineData(name)
    setResult(data)
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-sky-100 via-cyan-100 to-teal-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-teal-800">Airline Data</h1>

      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-sky-600 to-teal-600 text-white">
          <CardTitle className="text-2xl">Airline Information Lookup</CardTitle>
          <CardDescription className="text-gray-100 text-lg">
            Retrieve comprehensive data about airlines
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Alert className="mb-6 bg-cyan-50 border-cyan-200 text-cyan-800">
            <Plane className="h-5 w-5" />
            <AlertDescription className="text-base ml-2">
              Enter an airline name to get detailed information and fleet data.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter an airline name (e.g., Delta Air Lines)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleGetAirlineData()
                }
              }}
              className="flex-grow text-lg border-2 border-teal-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-200"
            />
            <Button
              onClick={handleGetAirlineData}
              disabled={isLoading}
              className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-6"
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {isLoading ? "Fetching..." : "Get Data"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
            <CardTitle className="text-2xl">Airline Information</CardTitle>
            <CardDescription className="text-gray-100 text-lg">Results for: {name}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {result.error ? (
              <Alert variant="destructive">
                <AlertDescription className="text-lg">{result.error}</AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.map((airline: any, index: number) => (
                  <Card key={index} className="bg-sky-50 border border-sky-200 overflow-hidden">
                    <CardHeader className="bg-sky-100">
                      <CardTitle className="text-2xl text-sky-800">{airline.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <InfoItem label="IATA Code" value={airline.iata} color="text-cyan-700" />
                        <InfoItem label="ICAO Code" value={airline.icao} color="text-teal-700" />
                        <InfoItem label="Fleet Size" value={airline.fleet_size.toString()} color="text-blue-700" />
                        <InfoItem label="Country" value={airline.country} color="text-indigo-700" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
    <div className="flex flex-col bg-white p-3 rounded-lg shadow-sm">
      <span className="text-sm font-medium text-sky-600">{label}</span>
      <span className={`text-lg font-semibold ${color}`}>{value}</span>
    </div>
  )
}

