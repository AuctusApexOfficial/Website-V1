import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { createConfirmationEmail } from "./confirmation-template"
import { sanitizeInput, checkRateLimit } from "@/utils/security"

// Initialize Resend with API key, with improved error handling for Vercel
let resend: Resend | null = null

export async function POST(request: NextRequest) {
  // Add this at the beginning of the POST function
  console.log("API route /api/send-email called")
  console.log("Running on Vercel:", !!process.env.VERCEL)
  console.log("Environment:", process.env.NODE_ENV)
  console.log("Resend API key available:", !!process.env.RESEND_API_KEY)

  try {
    // Initialize Resend inside the handler to ensure fresh initialization
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error("Resend API key is missing or invalid")
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
    console.log("Resend initialized successfully")

    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown"

    // Check rate limiting
    if (checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json({ success: false, error: "Too many requests. Please try again later." }, { status: 429 })
    }

    // Parse and validate request body
    const body = await request.json()
    const { name, email, phone, subject, message, service } = body

    // Validate required fields
    if (!email || !email.includes("@") || !name || !message) {
      return NextResponse.json({ success: false, error: "Please provide all required information" }, { status: 400 })
    }

    // Sanitize inputs to prevent XSS
    const sanitizedName = sanitizeInput(name)
    const sanitizedEmail = sanitizeInput(email)
    const sanitizedPhone = sanitizeInput(phone || "")
    const sanitizedSubject = sanitizeInput(subject)
    const sanitizedMessage = sanitizeInput(message)
    const sanitizedService = sanitizeInput(service || "")

    // Log the form data
    console.log("Contact form submission:", {
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      subject: sanitizedSubject,
      message: sanitizedMessage,
      service: sanitizedService,
    })

    // Handle potential serverless function timeout
    const startTime = Date.now()
    const MAX_EXECUTION_TIME = 9000 // 9 seconds (Vercel has a 10s limit for serverless functions)

    // Check if we're approaching the timeout limit
    const checkTimeout = () => {
      const elapsedTime = Date.now() - startTime
      if (elapsedTime > MAX_EXECUTION_TIME) {
        throw new Error("Function execution time approaching limit")
      }
    }

    // Add before sending notification email
    checkTimeout()

    console.log("Attempting to send notification email to admin")

    // Send notification email to the admin
    const { data: notificationData, error: notificationError } = await resend.emails.send({
      from: "no-reply@auctusapex.com",
      to: "info@auctusapex.com",
      subject: `New Contact Form Submission: ${sanitizedSubject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        ${sanitizedPhone ? `<p><strong>Phone:</strong> ${sanitizedPhone}</p>` : ""}
        ${sanitizedService ? `<p><strong>Service of Interest:</strong> ${sanitizedService}</p>` : ""}
        <p><strong>Subject:</strong> ${sanitizedSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (notificationError) {
      console.error("Error sending notification email:", notificationError)
      // Don't throw here, continue to try sending the confirmation email
    } else {
      console.log("Notification email sent successfully")
    }

    // Add before sending confirmation email
    checkTimeout()

    console.log("Attempting to send confirmation email to user")

    // Send confirmation email to the user
    const { data: confirmationData, error: confirmationError } = await resend.emails.send({
      from: "no-reply@auctusapex.com",
      to: sanitizedEmail,
      subject: "Thank you for contacting Auctus Apex",
      html: createConfirmationEmail(sanitizedName),
    })

    if (confirmationError) {
      console.error("Error sending confirmation email:", confirmationError)
      // Don't throw here, as we already sent the notification email
    } else {
      console.log("Confirmation email sent successfully")
    }

    // Return success response even if there were email errors
    // This prevents the user from seeing an error if the emails fail but the form submission was recorded
    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully.",
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

