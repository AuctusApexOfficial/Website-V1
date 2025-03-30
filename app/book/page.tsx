"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import BookingAnimation from "@/components/booking-animation"

export default function BookingPage() {
  const [isLoading, setIsLoading] = useState(false)

  // Update the Calendly link to ensure it's correct
  const calendlyLink = "https://calendly.com/auctusapex/15-minute-meeting"

  // Make sure the openCalendly function works properly
  const openCalendly = () => {
    window.open(calendlyLink, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="mb-8 inline-flex items-center text-amber-700 hover:text-amber-800">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Book Your <span className="text-amber-700">Consultation</span>
            </h1>
            <p className="mt-4 text-gray-600">
              Schedule a 15-minute Zoom consultation with our team. We'll discuss your needs and how we can help elevate
              your brand.
            </p>

            <div className="relative mt-8 h-[300px] overflow-hidden rounded-lg md:hidden">
              <BookingAnimation />
            </div>

            <Card className="mt-8 border-amber-200 bg-white shadow-md">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-amber-700" />
                  <h2 className="text-xl font-semibold">Schedule Your Meeting</h2>
                </div>

                <p className="mb-6 text-gray-600">
                  Click the button below to open our scheduling page where you can select a date and time that works
                  best for you.
                </p>

                <div className="rounded-lg bg-amber-50 p-4 mb-6">
                  <p className="text-sm text-amber-800">
                    <span className="font-medium">What to expect:</span>
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-amber-800">
                    <li>• 15-minute Zoom consultation</li>
                    <li>• Discussion of your marketing and design needs</li>
                    <li>• Personalized recommendations for your brand</li>
                    <li>• Next steps for potential collaboration</li>
                  </ul>
                </div>

                <Button onClick={openCalendly} className="w-full bg-amber-700 text-white hover:bg-amber-800" size="lg">
                  Schedule Now
                </Button>

                <p className="mt-4 text-center text-sm text-gray-500">
                  You'll be redirected to our secure scheduling system
                </p>
              </CardContent>
            </Card>

            <div className="mt-8">
              <h3 className="font-serif text-xl font-medium mb-4">Why Book a Consultation?</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                    <span className="text-amber-700 text-sm">✓</span>
                  </div>
                  <span>Get personalized insights for your specific business needs</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                    <span className="text-amber-700 text-sm">✓</span>
                  </div>
                  <span>Learn how our services can elevate your brand presence</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                    <span className="text-amber-700 text-sm">✓</span>
                  </div>
                  <span>Discuss your goals and receive tailored recommendations</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative hidden overflow-hidden rounded-lg md:block">
            <div className="absolute inset-0 bg-amber-900/20"></div>
            <BookingAnimation />
          </div>
        </div>
      </div>
    </div>
  )
}

