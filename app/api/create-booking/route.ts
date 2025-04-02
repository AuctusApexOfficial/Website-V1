import { NextResponse } from "next/server"

// Calendly API base URL
const CALENDLY_API_BASE = "https://api.calendly.com"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { date, time, name, email } = body

    // Validate required fields
    if (!date || !time || !name || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Get Calendly API key from environment variable
    const calendlyApiKey = process.env.CALENDLY_API_KEY

    if (!calendlyApiKey) {
      console.error("Calendly API key is not configured")
      return NextResponse.json(
        {
          success: false,
          error: "Calendly integration is not properly configured",
        },
        { status: 500 },
      )
    }

    // Log the successful booking attempt
    console.log("Booking request received:", {
      name,
      email,
      date,
      time,
    })

    // Note: In a production environment, you would use the Calendly API to create the booking
    // For now, we'll return a success response and direct users to the Calendly booking page

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Please use the Calendly booking page to schedule your appointment",
      redirectUrl: "https://calendly.com/auctusapex/15-minute-meeting",
    })
  } catch (error) {
    console.error("Error processing booking:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process booking",
      },
      { status: 500 },
    )
  }
}

