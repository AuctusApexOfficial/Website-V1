import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message, service } = await request.json()

    if (!email || !email.includes("@") || !name || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide all required information",
        },
        { status: 400 },
      )
    }

    // Log the contact form submission
    console.log(`Contact form submission from ${name} (${email})`)

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully",
    })
  } catch (error) {
    console.error("Error processing form submission:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process your submission",
      },
      { status: 500 },
    )
  }
}
