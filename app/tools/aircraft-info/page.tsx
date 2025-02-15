"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plane } from "lucide-react"
import { getAircraftInfo } from "@/app/actions/aircraft-info"

export default function AircraftInfo() {
  const [model, setModel] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetAircraftInfo = async () => {
    if (!model.trim()) return
    setIsLoading(true)
    const data = await getAircraftInfo(model)
    setResult(data)
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-100 via-indigo-100 to-violet-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">Aircraft Information</h1>

      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardTitle className="text-2xl">Aircraft Model Lookup</CardTitle>
          <CardDescription className="text-gray-100 text-lg">
            Retrieve detailed information about aircraft models
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Alert className="mb-6 bg-indigo-50 border-indigo-200 text-indigo-800">
            <Plane className="h-5 w-5" />
            <AlertDescription className="text-base ml-2">
              Enter an aircraft model to get comprehensive technical specifications.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter an aircraft model (e.g., Boeing 747)"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleGetAircraftInfo()
                }
              }}
              className="flex-grow text-lg border-2 border-indigo-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
            <Button
              onClick={handleGetAircraftInfo}
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-6"
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {isLoading ? "Searching..." : "Get Info"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
            <CardTitle className="text-2xl">Aircraft Information</CardTitle>
            <CardDescription className="text-gray-100 text-lg">Model: {model}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {result.error ? (
              <Alert variant="destructive">
                <AlertDescription className="text-lg">{result.error}</AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.map((aircraft: any, index: number) => (
                  <Card key={index} className="bg-indigo-50 border border-indigo-200 overflow-hidden">
                    <CardHeader className="bg-indigo-100">
                      <CardTitle className="text-2xl text-indigo-800">{aircraft.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <InfoItem label="Type" value={aircraft.type} />
                        <InfoItem label="Engine" value={aircraft.engine} />
                        <InfoItem label="Max Speed" value={`${aircraft.max_speed_knots} knots`} />
                        <InfoItem label="Ceiling" value={`${aircraft.ceiling_ft} ft`} />
                        <InfoItem label="Range" value={`${aircraft.range_miles} miles`} />
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

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col bg-white p-3 rounded-lg shadow-sm">
      <span className="text-sm font-medium text-indigo-600">{label}</span>
      <span className="text-lg font-semibold text-gray-800">{value}</span>
    </div>
  )
}

