"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import CalendlyEmbed from "@/components/calendly-embed"

export default function BookingEmbedPage() {
  return (
    <div className="min-h-screen bg-stone-100 pt-24">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="mb-8 inline-flex items-center text-amber-700 hover:text-amber-800">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <h1 className="font-serif text-3xl font-bold tracking-tight text-gray-900 md:text-4xl mb-8 text-center">
          Book Your <span className="text-amber-700">Consultation</span>
        </h1>

        <div className="mx-auto max-w-4xl bg-white rounded-lg shadow-md p-4 md:p-8">
          <CalendlyEmbed
            url="https://calendly.com/auctusapex/15-minute-meeting"
            className="w-full rounded-lg overflow-hidden"
            styles={{ height: "700px" }}
          />
        </div>
      </div>
    </div>
  )
}
