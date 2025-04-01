import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, phone } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address",
        },
        { status: 400 },
      )
    }

    // Log the subscription data
    console.log(`Newsletter form submission: ${email}${phone ? `, Phone: ${phone}` : ""}`)

    // In a real implementation, you would add the email to your newsletter list
    // For now, we'll just return success

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to the newsletter",
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

