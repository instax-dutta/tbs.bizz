"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Phone } from "lucide-react"
import { validatePhone } from "@/app/actions/phone-validator"

export default function PhoneValidator() {
  const [phone, setPhone] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleValidatePhone = async () => {
    if (!phone.trim()) return
    setIsLoading(true)
    const data = await validatePhone(phone)
    setResult(data)
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">Phone Validator</h1>

      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          <CardTitle className="text-2xl">Phone Number Validation</CardTitle>
          <CardDescription className="text-gray-100 text-lg">
            Verify and retrieve information for any phone number
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Alert className="mb-6 bg-blue-50 border-blue-200 text-blue-800">
            <Phone className="h-5 w-5" />
            <AlertDescription className="text-base ml-2">
              Check the validity of a phone number and get detailed metadata.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter a phone number (e.g., +1 555-123-4567)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleValidatePhone()
                }
              }}
              className="flex-grow text-lg border-2 border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            />
            <Button
              onClick={handleValidatePhone}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6"
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {isLoading ? "Validating..." : "Validate"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <CardTitle className="text-2xl">Validation Result</CardTitle>
            <CardDescription className="text-gray-100 text-lg">Phone: {phone}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {result.error ? (
              <Alert variant="destructive">
                <AlertDescription className="text-lg">{result.error}</AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="font-semibold text-xl mb-2 text-blue-800">Validity</p>
                    <p className="text-xl">
                      <strong>Valid:</strong>{" "}
                      <span className={result.is_valid ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                        {result.is_valid ? "Yes" : "No"}
                      </span>
                    </p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <p className="font-semibold text-xl mb-2 text-indigo-800">Format</p>
                    <p className="text-xl">
                      <strong>Format:</strong> <span className="font-medium">{result.format}</span>
                    </p>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                    <p className="font-semibold text-xl mb-2 text-cyan-800">Country</p>
                    <p className="text-xl">
                      <strong>Country:</strong> <span className="font-medium">{result.country}</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="font-semibold text-xl mb-2 text-purple-800">Location</p>
                    <p className="text-xl">
                      <strong>Location:</strong> <span className="font-medium">{result.location}</span>
                    </p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                    <p className="font-semibold text-xl mb-2 text-pink-800">Carrier</p>
                    <p className="text-xl">
                      <strong>Carrier:</strong> <span className="font-medium">{result.carrier}</span>
                    </p>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                    <p className="font-semibold text-xl mb-2 text-teal-800">Line Type</p>
                    <p className="text-xl">
                      <strong>Line Type:</strong> <span className="font-medium">{result.line_type}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

