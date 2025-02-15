"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, Loader2, Share2 } from "lucide-react"

interface ShareCounts {
  StumbleUpon?: number
  Reddit?: number
  GooglePlusOne?: number
  Twitter?: number
  Pinterest?: number
  LinkedIn?: number
  Facebook?: {
    commentsbox_count?: number
    click_count?: number
    total_count?: number
    comment_count?: number
    like_count?: number
    share_count?: number
  }
  Delicious?: number
}

export default function SharedCount() {
  const [url, setUrl] = useState("")
  const [result, setResult] = useState<ShareCounts | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGetShareCounts = async () => {
    if (!url.trim()) {
      setError("Please enter a URL")
      return
    }

    setIsLoading(true)
    setResult(null)
    setError(null)

    try {
      const response = await fetch(
        `https://api.sharedcount.com/v1.1?apikey=b9a61889d44f91ccc1f1325661d6ab9ce5d50028&url=${encodeURIComponent(url)}`,
      )

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data: ShareCounts = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error fetching share counts:", error)
      setError("Failed to fetch share counts. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">SharedCount</h1>

      <Alert className="mb-6 bg-indigo-50 border-indigo-200 text-indigo-800">
        <InfoIcon className="h-5 w-5" />
        <AlertDescription className="text-base ml-2">
          Enter a URL to retrieve its social media share counts.
        </AlertDescription>
      </Alert>

      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <CardTitle className="text-2xl">URL Share Count Lookup</CardTitle>
          <CardDescription className="text-gray-100 text-lg">
            Get detailed social media engagement metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter a URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow text-lg border-2 border-indigo-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
            <Button
              onClick={handleGetShareCounts}
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Fetching...
                </>
              ) : (
                <>
                  <Share2 className="mr-2 h-5 w-5" />
                  Get Share Counts
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription className="text-lg">{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <CardTitle className="text-2xl">Share Counts</CardTitle>
            <CardDescription className="text-gray-100 text-lg">URL: {url}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ShareCountSection
                title="Facebook Engagement"
                items={[
                  { label: "Total", value: result.Facebook?.total_count },
                  { label: "Likes", value: result.Facebook?.like_count },
                  { label: "Shares", value: result.Facebook?.share_count },
                  { label: "Comments", value: result.Facebook?.comment_count },
                  { label: "Clicks", value: result.Facebook?.click_count },
                ]}
                color="blue"
              />
              <ShareCountSection
                title="Other Platforms"
                items={[
                  { label: "Twitter", value: result.Twitter },
                  { label: "Pinterest", value: result.Pinterest },
                  { label: "LinkedIn", value: result.LinkedIn },
                  { label: "Reddit", value: result.Reddit },
                  { label: "StumbleUpon", value: result.StumbleUpon },
                ]}
                color="purple"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface ShareCountSectionProps {
  title: string
  items: { label: string; value: number | undefined }[]
  color: "blue" | "purple"
}

function ShareCountSection({ title, items, color }: ShareCountSectionProps) {
  const bgColor = color === "blue" ? "bg-blue-50" : "bg-purple-50"
  const borderColor = color === "blue" ? "border-blue-200" : "border-purple-200"
  const textColor = color === "blue" ? "text-blue-800" : "text-purple-800"

  return (
    <div className={`${bgColor} p-4 rounded-lg border ${borderColor}`}>
      <h3 className={`font-semibold text-xl mb-4 ${textColor}`}>{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className={`text-sm font-medium ${textColor}`}>{item.label}</span>
            <span className={`text-lg font-bold ${textColor}`}>
              {item.value !== undefined ? item.value.toLocaleString() : "N/A"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

