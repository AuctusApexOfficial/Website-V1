import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { createConfirmationEmail } from "./confirmation-template"
import { sanitizeInput, checkRateLimit } from "@/utils/security"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
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

    // Send notification email to site owner
    const { data: notificationData, error: notificationError } = await resend.emails.send({
      from: "onboarding@resend.dev", // Using Resend's default email
      to: "info@auctusapex.com", // Your business email
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
      throw new Error("Failed to send notification email")
    }

    // Send confirmation email to the user
    const { data: confirmationData, error: confirmationError } = await resend.emails.send({
      from: "onboarding@resend.dev", // Using Resend's default email
      to: sanitizedEmail,
      subject: "Thank you for contacting Auctus Apex",
      html: createConfirmationEmail(sanitizedName),
    })

    if (confirmationError) {
      console.error("Error sending confirmation email:", confirmationError)
      // Don't throw here, as we already sent the notification email
    }

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

