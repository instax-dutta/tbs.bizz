"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Bike } from "lucide-react"
import { getMotorcycleSpecs } from "@/app/actions/motorcycle-specs"

export default function MotorcycleSpecs() {
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetMotorcycleSpecs = async () => {
    if (!make.trim() || !model.trim()) return
    setIsLoading(true)
    const data = await getMotorcycleSpecs(make, model)
    setResult(data)
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-red-100 via-rose-100 to-pink-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-rose-800">Motorcycle Specifications</h1>

      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-red-600 to-rose-600 text-white">
          <CardTitle className="text-2xl">Motorcycle Model Lookup</CardTitle>
          <CardDescription className="text-gray-100 text-lg">
            Retrieve detailed specifications for motorcycle models
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Alert className="mb-6 bg-rose-50 border-rose-200 text-rose-800">
            <Bike className="h-5 w-5" />
            <AlertDescription className="text-base ml-2">
              Enter a motorcycle make and model to get comprehensive technical data.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="text"
              placeholder="Enter motorcycle make (e.g., Honda)"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="flex-grow text-lg border-2 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
            />
            <Input
              type="text"
              placeholder="Enter motorcycle model (e.g., CBR1000RR)"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleGetMotorcycleSpecs()
                }
              }}
              className="flex-grow text-lg border-2 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
            />
            <Button
              onClick={handleGetMotorcycleSpecs}
              disabled={isLoading}
              className="bg-rose-600 hover:bg-rose-700 text-white text-lg px-6"
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {isLoading ? "Fetching..." : "Get Specs"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-rose-600 to-pink-600 text-white">
            <CardTitle className="text-2xl">Motorcycle Specifications</CardTitle>
            <CardDescription className="text-gray-100 text-lg">
              Make: {make}, Model: {model}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {result.error ? (
              <Alert variant="destructive">
                <AlertDescription className="text-lg">{result.error}</AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.map((motorcycle: any, index: number) => (
                  <Card key={index} className="bg-red-50 border border-red-200 overflow-hidden">
                    <CardHeader className="bg-red-100">
                      <CardTitle className="text-2xl text-red-800">
                        {motorcycle.make} {motorcycle.model}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <InfoItem label="Year" value={motorcycle.year.toString()} color="text-rose-700" />
                        <InfoItem label="Type" value={motorcycle.type} color="text-pink-700" />
                        <InfoItem label="Displacement" value={`${motorcycle.displacement} cc`} color="text-red-700" />
                        <InfoItem label="Engine" value={motorcycle.engine} color="text-rose-800" />
                        <InfoItem label="Power" value={motorcycle.power} color="text-pink-800" />
                        <InfoItem label="Torque" value={motorcycle.torque} color="text-red-800" />
                        <InfoItem label="Transmission" value={motorcycle.transmission} color="text-rose-700" />
                        <InfoItem
                          label="Fuel Capacity"
                          value={`${motorcycle.fuel_capacity} liters`}
                          color="text-pink-700"
                        />
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
      <span className="text-sm font-medium text-rose-600">{label}</span>
      <span className={`text-lg font-semibold ${color}`}>{value}</span>
    </div>
  )
}

