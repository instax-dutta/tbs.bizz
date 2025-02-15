"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, BirdIcon as Helicopter } from "lucide-react"
import { getHelicopterInfo } from "@/app/actions/helicopter-database"

export default function HelicopterDatabase() {
  const [model, setModel] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetHelicopterInfo = async () => {
    if (!model.trim()) return
    setIsLoading(true)
    const data = await getHelicopterInfo(model)
    setResult(data)
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-800">Helicopter Database</h1>

      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
          <CardTitle className="text-2xl">Helicopter Model Lookup</CardTitle>
          <CardDescription className="text-gray-100 text-lg">
            Access detailed information on helicopter models
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Alert className="mb-6 bg-amber-50 border-amber-200 text-amber-800">
            <Helicopter className="h-5 w-5" />
            <AlertDescription className="text-base ml-2">
              Enter a helicopter model to retrieve comprehensive technical specifications.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter a helicopter model (e.g., Bell 407)"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleGetHelicopterInfo()
                }
              }}
              className="flex-grow text-lg border-2 border-amber-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
            />
            <Button
              onClick={handleGetHelicopterInfo}
              disabled={isLoading}
              className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-6"
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {isLoading ? "Searching..." : "Get Info"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
            <CardTitle className="text-2xl">Helicopter Information</CardTitle>
            <CardDescription className="text-gray-100 text-lg">Model: {model}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {result.error ? (
              <Alert variant="destructive">
                <AlertDescription className="text-lg">{result.error}</AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.map((helicopter: any, index: number) => (
                  <Card key={index} className="bg-orange-50 border border-orange-200 overflow-hidden">
                    <CardHeader className="bg-orange-100">
                      <CardTitle className="text-2xl text-orange-800">{helicopter.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <InfoItem label="Type" value={helicopter.type} color="text-amber-700" />
                        <InfoItem label="Engine" value={helicopter.engine} color="text-orange-700" />
                        <InfoItem
                          label="Max Speed"
                          value={`${helicopter.max_speed_knots} knots`}
                          color="text-red-700"
                        />
                        <InfoItem label="Ceiling" value={`${helicopter.ceiling_ft} ft`} color="text-yellow-700" />
                        <InfoItem label="Range" value={`${helicopter.range_miles} miles`} color="text-amber-800" />
                        <InfoItem label="Crew" value={helicopter.crew} color="text-orange-800" />
                        <InfoItem label="Capacity" value={helicopter.capacity} color="text-red-800" />
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
      <span className="text-sm font-medium text-amber-600">{label}</span>
      <span className={`text-lg font-semibold ${color}`}>{value}</span>
    </div>
  )
}

