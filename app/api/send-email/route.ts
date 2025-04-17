import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { createConfirmationEmail } from "./confirmation-template"
import { sanitizeInput, checkRateLimit } from "@/utils/security"

// Initialize Resend with API key, with improved error handling for Vercel
let resend: Resend | null = null
try {
  const resendApiKey = process.env.RESEND_API_KEY
  if (resendApiKey) {
    resend = new Resend(resendApiKey)
    console.log("Resend initialized successfully")
  } else {
    console.error("Resend API key is missing")
  }
} catch (error) {
  console.error("Failed to initialize Resend:", error)
}

// The email associated with your Resend account - this is the only recipient allowed in testing mode
const RESEND_ACCOUNT_EMAIL = "auctusapex@gmail.com"

// Add or update the TESTING_MODE constant
const TESTING_MODE = false // Set to false since domain is verified with Resend

export async function POST(request: NextRequest) {
  // Add this at the beginning of the POST function
  console.log("API route /api/send-email called")
  console.log("Running on Vercel:", !!process.env.VERCEL)
  console.log("Environment:", process.env.NODE_ENV)
  console.log("Resend API key available:", !!process.env.RESEND_API_KEY)

  try {
    // Check if Resend is properly initialized
    if (!resend) {
      console.error("Resend API key is missing or invalid")
      return NextResponse.json(
        {
          success: false,
          error: "Email service is not configured properly. Please try again later.",
        },
        { status: 500 },
      )
    }

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

    // In testing mode, we can only send to the email associated with the Resend account
    // Store the form data in the database or log it for now
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

    // Send notification email to the Resend account email (only allowed recipient in testing)
    const { data: notificationData, error: notificationError } = await resend.emails.send({
      from: "no-reply@auctusapex.it", // Changed from onboarding@resend.dev to no-reply@auctusapex.it
      to: RESEND_ACCOUNT_EMAIL, // Your Resend account email
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
      throw new Error("Failed to send notification email: " + notificationError.message)
    }

    // Add before sending confirmation email
    checkTimeout()

    // Only send confirmation email if the user's email is the same as the Resend account email
    // This is a limitation of Resend's testing mode
    if (sanitizedEmail.toLowerCase() === RESEND_ACCOUNT_EMAIL.toLowerCase()) {
      const { data: confirmationData, error: confirmationError } = await resend.emails.send({
        from: "no-reply@auctusapex.it", // Changed from onboarding@resend.dev to no-reply@auctusapex.it
        to: sanitizedEmail,
        subject: "Thank you for contacting Auctus Apex",
        html: createConfirmationEmail(sanitizedName),
      })

      if (confirmationError) {
        console.error("Error sending confirmation email:", confirmationError)
        // Don't throw here, as we already sent the notification email
      }
    } else {
      console.log("Skipping confirmation email - recipient not allowed in testing mode")
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message:
        "Your message has been sent successfully. Note: In preview mode, emails are only sent to the developer's email address.",
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
