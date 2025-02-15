"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "503a049e-494b-4a26-b931-7744ff5f911d",
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      })

      const result = await response.json()

      // Clear any existing toasts to prevent multiple notifications
      toast.dismiss()

      if (response.ok) {
        if (result.success) {
          toast.success("Message sent successfully!")
          e.currentTarget.reset()
        } else {
          console.error("API returned success: false", result)
          toast.error("Failed to send message. Please try again.")
        }
      } else {
        console.error("HTTP error", response.status, result)
        toast.error("Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error("An error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-16">
      <section className="text-center py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none" />
        <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg relative z-10">Contact Us</h1>
        <p className="text-xl mb-8 text-white/80 max-w-3xl mx-auto relative z-10">
          We'd love to hear from you! Whether you have a question about our tools, need assistance, or want to provide
          feedback, we're here to help.
        </p>
      </section>

      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-yellow-100 to-pink-100">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-purple-800">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input type="text" id="name" name="name" required placeholder="Your name" className="w-full" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="email@example.com"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Enter your message"
                  className="w-full"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  )
}

