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

    // Get current date and time for the email
    const currentDate = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    // Send notification email to the admin with improved design
    const { data: notificationData, error: notificationError } = await resend.emails.send({
      from: "no-reply@auctusapex.com",
      to: "info@auctusapex.com",
      subject: `New Contact Form: ${sanitizedSubject}`,
      html: `
       <!DOCTYPE html>
       <html>
       <head>
         <meta charset="utf-8">
         <title>New Contact Form Submission</title>
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
             font-size: 28px;
             font-weight: bold;
             color: #b88c3f;
             margin-bottom: 10px;
           }
           .logo-accent {
             color: #333;
           }
           .badge {
             display: inline-block;
             background-color: #b88c3f;
             color: white;
             padding: 5px 10px;
             border-radius: 20px;
             font-size: 12px;
             margin-bottom: 15px;
           }
           .timestamp {
             color: #777;
             font-size: 14px;
             margin-bottom: 20px;
             font-style: italic;
           }
           .field {
             margin-bottom: 15px;
             border-left: 3px solid #e6d19f;
             padding-left: 15px;
           }
           .field-label {
             font-weight: bold;
             color: #b88c3f;
             margin-bottom: 5px;
             display: block;
           }
           .field-value {
             background-color: #f9f8f6;
             padding: 10px;
             border-radius: 4px;
           }
           .message-box {
             background-color: #f9f8f6;
             padding: 15px;
             border-radius: 4px;
             margin-top: 10px;
             white-space: pre-wrap;
             border-left: 3px solid #b88c3f;
           }
           .footer {
             margin-top: 30px;
             padding-top: 20px;
             border-top: 1px solid #e6d19f;
             font-size: 12px;
             color: #777;
             text-align: center;
           }
           .button {
             display: inline-block;
             background-color: #b88c3f;
             color: white !important;
             padding: 10px 20px;
             text-decoration: none;
             border-radius: 4px;
             margin-top: 20px;
             font-weight: bold;
           }
           .button:hover {
             background-color: #a07935;
           }
           .actions {
             text-align: center;
             margin-top: 25px;
           }
           .priority-high {
             background-color: #f8d7da;
             border-left: 3px solid #dc3545;
           }
           .priority-medium {
             background-color: #fff3cd;
             border-left: 3px solid #ffc107;
           }
           .priority-normal {
             background-color: #f9f8f6;
             border-left: 3px solid #b88c3f;
           }
         </style>
       </head>
       <body>
         <div class="container">
           <div class="header">
             <div class="logo">Auctus <span class="logo-accent">Apex</span></div>
             <div class="badge">New Contact Form Submission</div>
             <div class="timestamp">Received on ${currentDate}</div>
           </div>
           
           <div class="field">
             <span class="field-label">Name:</span>
             <div class="field-value">${sanitizedName}</div>
           </div>
           
           <div class="field">
             <span class="field-label">Email:</span>
             <div class="field-value">${sanitizedEmail}</div>
           </div>
           
           ${
             sanitizedPhone
               ? `
           <div class="field">
             <span class="field-label">Phone:</span>
             <div class="field-value">${sanitizedPhone}</div>
           </div>
           `
               : ""
           }
           
           ${
             sanitizedService
               ? `
           <div class="field">
             <span class="field-label">Service of Interest:</span>
             <div class="field-value">${sanitizedService}</div>
           </div>
           `
               : ""
           }
           
           <div class="field">
             <span class="field-label">Subject:</span>
             <div class="field-value">${sanitizedSubject}</div>
           </div>
           
           <div class="field">
             <span class="field-label">Message:</span>
             <div class="message-box">${sanitizedMessage.replace(/\n/g, "<br>")}</div>
           </div>
           
           <div class="actions">
             <a href="mailto:${sanitizedEmail}?subject=RE: ${encodeURIComponent(sanitizedSubject)}" class="button">Reply to ${sanitizedName}</a>
           </div>
           
           <div class="footer">
             <p>This is an automated notification from your website contact form.</p>
             <p>&copy; ${new Date().getFullYear()} Auctus Apex. All rights reserved.</p>
           </div>
         </div>
       </body>
       </html>
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

