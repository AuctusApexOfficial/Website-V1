"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SurveyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get date and time from URL parameters if available
  // These might be passed from Calendly via redirect
  const date = searchParams.get("date") || "your scheduled date"
  const time = searchParams.get("time") || "your scheduled time"
  const inviteeEmail = searchParams.get("email") || ""
  const inviteeName = searchParams.get("name") || ""

  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    customIndustry: "",
    location: "",
    ownerName: inviteeName || "",
    needs: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, industry: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real implementation, you would send this data to your backend
      // along with the booking details to associate with the Calendly event

      // Prepare the data - if industry is "other", use the customIndustry value
      const submissionData = {
        ...formData,
        industry: formData.industry === "other" ? formData.customIndustry : formData.industry,
        appointmentDate: date,
        appointmentTime: time,
        email: inviteeEmail,
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Form submitted:", submissionData)
      setSubmitted(true)

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-100 p-4">
        <Card className="w-full max-w-md border-amber-200 bg-white shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="font-serif text-2xl">Thank You!</CardTitle>
            <CardDescription>
              Your consultation has been booked for {date} at {time}. We'll be in touch shortly to confirm your
              appointment.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-500">Redirecting you to the homepage...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-100 py-12">
      <div className="container mx-auto px-4">
        <Link href="/book" className="mb-8 inline-flex items-center text-amber-700 hover:text-amber-800">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Booking
        </Link>

        <div className="mx-auto max-w-2xl">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Tell Us About <span className="text-amber-700">Your Business</span>
          </h1>
          <p className="mt-4 text-gray-600">
            Please provide some information about your business so we can prepare for our consultation on {date} at{" "}
            {time}.
          </p>

          <Card className="mt-8 border-amber-200 bg-white shadow-md">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select onValueChange={handleSelectChange} required>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.industry === "other" && (
                  <div className="space-y-2">
                    <Label htmlFor="customIndustry">Please specify your industry</Label>
                    <Input
                      id="customIndustry"
                      name="customIndustry"
                      value={formData.customIndustry}
                      onChange={handleChange}
                      required
                      className="border-gray-300"
                      placeholder="Enter your industry"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="border-gray-300"
                    placeholder="City, Country"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner's Name</Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    required
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="needs">What do you need help with?</Label>
                  <Textarea
                    id="needs"
                    name="needs"
                    value={formData.needs}
                    onChange={handleChange}
                    required
                    className="min-h-[120px] border-gray-300"
                    placeholder="Please describe your marketing or web design needs..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-700 text-white hover:bg-amber-800"
                  disabled={isSubmitting || (formData.industry === "other" && !formData.customIndustry)}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
