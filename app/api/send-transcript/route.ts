import { NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend with API key
let resend: Resend | null = null
try {
  const resendApiKey = process.env.RESEND_API_KEY
  if (resendApiKey) {
    resend = new Resend(resendApiKey)
    console.log("Resend initialized successfully for transcript sending")
  } else {
    console.error("Resend API key is missing for transcript sending")
  }
} catch (error) {
  console.error("Failed to initialize Resend for transcript sending:", error)
}

export async function POST(request: Request) {
  try {
    // Check if Resend is properly initialized
    if (!resend) {
      console.error("Resend API key is missing or invalid for transcript sending")
      return NextResponse.json(
        {
          success: false,
          error: "Email service is not configured properly. Please try again later.",
        },
        { status: 500 },
      )
    }

    // Parse request body
    const body = await request.json()
    const { email, transcript } = body

    // Validate required fields
    if (!email || !transcript) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and transcript are required",
        },
        { status: 400 },
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email address",
        },
        { status: 400 },
      )
    }

    // Format the transcript for HTML email
    const formattedTranscript = transcript
      .replace(/\n/g, "<br>")
      .replace(/You:/g, "<strong style='color: #b88c3f;'>You:</strong>")
      .replace(/Auctus Assistant:/g, "<strong style='color: #292524;'>Auctus Assistant:</strong>")

    // Create HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Your Chat Transcript with Auctus Apex</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            background-color: #f9f8f6;
          }
          .container {
            padding: 30px;
            border: 1px solid #e6d19f;
            border-radius: 5px;
            background-color: #ffffff;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #e6d19f;
            margin-bottom: 20px;
          }
          .logo {
            font-family: serif;
            font-size: 24px;
            font-weight: bold;
            color: #b88c3f;
            margin-bottom: 10px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e6d19f;
            font-size: 12px;
            color: #777;
            text-align: center;
          }
          h1 {
            color: #b88c3f;
            font-family: serif;
          }
          .transcript {
            background-color: #f8f5f0;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
            border-left: 3px solid #e6d19f;
          }
          .accent {
            color: #b88c3f;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Auctus Apex</div>
            <h1>Your Chat Transcript</h1>
          </div>
          
          <p>Thank you for chatting with Auctus Apex. Below is a transcript of your conversation:</p>
          
          <div class="transcript">
            ${formattedTranscript}
          </div>
          
          <p>If you have any further questions, please don't hesitate to reach out to us.</p>
          
          <p>Best regards,</p>
          <p><span class="accent">Auctus Apex</span> Team</p>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Auctus Apex. All rights reserved.</p>
            <p><em>"Ad astra per aspera" — To the stars through difficulties</em></p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send email with transcript
    const { data, error } = await resend.emails.send({
      from: "Auctus Apex <onboarding@resend.dev>",
      to: email,
      subject: "Your Chat Transcript with Auctus Apex",
      html: htmlContent,
    })

    if (error) {
      console.error("Error sending transcript email:", error)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send transcript email",
        },
        { status: 500 },
      )
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Transcript sent successfully",
    })
  } catch (error) {
    console.error("Error processing transcript request:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process your request",
      },
      { status: 500 },
    )
  }
}
