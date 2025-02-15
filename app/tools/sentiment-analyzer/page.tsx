"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, MessageSquare } from "lucide-react"
import { analyzeSentiment } from "@/app/actions/sentiment-analyzer"

export default function SentimentAnalyzer() {
  const [text, setText] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAnalyzeSentiment = async () => {
    if (!text.trim()) return
    setIsLoading(true)
    const data = await analyzeSentiment(text)
    setResult(data)
    setIsLoading(false)
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "text-green-600"
      case "negative":
        return "text-red-600"
      default:
        return "text-yellow-600"
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-800">Sentiment Analyzer</h1>

      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <CardTitle className="text-2xl">Text Sentiment Analysis</CardTitle>
          <CardDescription className="text-gray-100 text-lg">Enter text to analyze its sentiment</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Alert className="mb-6 bg-orange-50 border-orange-200 text-orange-800">
            <MessageSquare className="h-5 w-5" />
            <AlertDescription className="text-base ml-2">
              Get fast and accurate sentiment analysis results for any given text.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <Textarea
              placeholder="Enter text to analyze (e.g., I love this product, it's amazing!)"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="w-full text-lg border-2 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            />
            <Button
              onClick={handleAnalyzeSentiment}
              disabled={isLoading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white text-lg"
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {isLoading ? "Analyzing..." : "Analyze Sentiment"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardTitle className="text-2xl">Sentiment Analysis Result</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {result.error ? (
              <Alert variant="destructive">
                <AlertDescription className="text-lg">{result.error}</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-3xl font-semibold mb-2">
                    Sentiment:{" "}
                    <span className={`${getSentimentColor(result.sentiment)} font-bold`}>{result.sentiment}</span>
                  </p>
                  <p className="text-2xl">
                    Score: <span className="font-semibold">{result.score.toFixed(2)}</span>
                  </p>
                </div>
                <p className="text-gray-700 text-lg bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  A score closer to 1 indicates a more positive sentiment, while a score closer to -1 indicates a more
                  negative sentiment.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

