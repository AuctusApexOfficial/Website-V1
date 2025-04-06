import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { sanitizeInput, checkRateLimit } from "@/utils/security"

// Initialize Resend with API key - improved error handling
let resend: Resend | null = null

export async function POST(request: NextRequest) {
  console.log("API route /api/subscribe called")
  console.log("Running on Vercel:", !!process.env.VERCEL)
  console.log("Environment:", process.env.NODE_ENV)
  console.log("Resend API key available:", !!process.env.RESEND_API_KEY)

  try {
    // Initialize Resend inside the handler to ensure fresh initialization
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error("Resend API key is missing for newsletter")
      return NextResponse.json(
        {
          success: false,
          error: "Email service is not configured properly. Please try again later.",
        },
        { status: 500 },
      )
    }

    // Initialize Resend with the API key
    resend = new Resend(resendApiKey)
    console.log("Resend initialized successfully for newsletter")

    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown"

    // Check rate limiting
    if (checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json({ success: false, error: "Too many requests. Please try again later." }, { status: 429 })
    }

    // Parse and validate request body
    const body = await request.json()
    const { email, phone } = body

    // Validate required fields
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address",
        },
        { status: 400 },
      )
    }

    // Sanitize inputs to prevent XSS
    const sanitizedEmail = sanitizeInput(email)
    const sanitizedPhone = sanitizeInput(phone || "")

    // Log the subscription
    console.log("Newsletter subscription:", {
      email: sanitizedEmail,
      phone: sanitizedPhone,
    })

    // For debugging - log before sending email
    console.log("Attempting to send notification email to admin")

    // Send notification email to admin
    const { data: notificationData, error: notificationError } = await resend.emails.send({
      from: "no-reply@auctusapex.com",
      to: "info@auctusapex.com",
      subject: "New Newsletter Subscription",
      html: `
        <h1>New Newsletter Subscription</h1>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        ${sanitizedPhone ? `<p><strong>Phone:</strong> ${sanitizedPhone}</p>` : ""}
      `,
    })

    if (notificationError) {
      console.error("Error sending newsletter notification email:", notificationError)
      // Don't throw here, continue to try sending the confirmation email
    } else {
      console.log("Newsletter notification email sent successfully")
    }

    // For debugging - log before sending confirmation email
    console.log("Attempting to send confirmation email to subscriber")

    // Send confirmation email to the user
    const { data: confirmationData, error: confirmationError } = await resend.emails.send({
      from: "no-reply@auctusapex.com",
      to: sanitizedEmail,
      subject: "Welcome to Auctus Apex Newsletter",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Auctus Apex Newsletter</title>
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
            .accent {
              color: #b88c3f;
            }
            .button {
              display: inline-block;
              background-color: #b88c3f;
              color: white;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 4px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Auctus Apex</div>
              <h1>Welcome to Our Newsletter</h1>
            </div>
            
            <p>Thank you for subscribing to the Auctus Apex newsletter!</p>
            
            <p>You'll now receive updates on our latest services, industry insights, and exclusive offers directly to your inbox.</p>
            
            <p>We're committed to providing valuable content that helps elevate your brand and digital presence.</p>
            
            <div style="text-align: center;">
              <a href="https://auctusapex.com" class="button">Visit Our Website</a>
            </div>
            
            <p>Best regards,</p>
            <p><span class="accent">Auctus Apex</span> Team</p>
            
            <div class="footer">
              <p>This is an automated response. Please do not reply to this email.</p>
              <p>&copy; ${new Date().getFullYear()} Auctus Apex. All rights reserved.</p>
              <p><em>"Ad astra per aspera" — To the stars through difficulties</em></p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (confirmationError) {
      console.error("Error sending newsletter confirmation email:", confirmationError)
      // Don't throw here, we'll still return success if at least one email was sent or attempted
    } else {
      console.log("Newsletter confirmation email sent successfully")
    }

    // Return success response even if there were email errors
    // This prevents the user from seeing an error if the emails fail but the subscription was recorded
    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to the newsletter",
    })
  } catch (error) {
    console.error("Error processing newsletter subscription:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process your subscription",
      },
      { status: 500 },
    )
  }
}

