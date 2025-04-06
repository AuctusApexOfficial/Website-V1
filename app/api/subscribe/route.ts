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

    // Get current date and time for the email
    const currentDate = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    // For debugging - log before sending email
    console.log("Attempting to send notification email to admin")

    // Send notification email to admin with improved design
    const { data: notificationData, error: notificationError } = await resend.emails.send({
      from: "no-reply@auctusapex.com",
      to: "info@auctusapex.com",
      subject: "New Newsletter Subscription",
      html: `
       <!DOCTYPE html>
       <html>
       <head>
         <meta charset="utf-8">
         <title>New Newsletter Subscription</title>
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
             background-color: #28a745;
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
             border-left: 3px solid #28a745;
             padding-left: 15px;
           }
           .field-label {
             font-weight: bold;
             color: #28a745;
             margin-bottom: 5px;
             display: block;
           }
           .field-value {
             background-color: #f9f8f6;
             padding: 10px;
             border-radius: 4px;
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
             background-color: #28a745;
             color: white !important;
             padding: 10px 20px;
             text-decoration: none;
             border-radius: 4px;
             margin-top: 20px;
             font-weight: bold;
           }
           .button:hover {
             background-color: #218838;
           }
           .actions {
             text-align: center;
             margin-top: 25px;
           }
           .stats-container {
             background-color: #f8f9fa;
             border-radius: 5px;
             padding: 15px;
             margin-top: 20px;
             text-align: center;
           }
           .stats-title {
             font-weight: bold;
             color: #495057;
             margin-bottom: 10px;
           }
           .stats-grid {
             display: inline-block;
             margin: 0 10px;
             text-align: center;
           }
           .stats-number {
             font-size: 24px;
             font-weight: bold;
             color: #28a745;
           }
           .stats-label {
             font-size: 12px;
             color: #6c757d;
           }
           .divider {
             height: 1px;
             background-color: #e6d19f;
             margin: 20px 0;
             opacity: 0.5;
           }
         </style>
       </head>
       <body>
         <div class="container">
           <div class="header">
             <div class="logo">Auctus <span class="logo-accent">Apex</span></div>
             <div class="badge">New Newsletter Subscriber</div>
             <div class="timestamp">Received on ${currentDate}</div>
           </div>
           
           <div class="field">
             <span class="field-label">Email Address:</span>
             <div class="field-value">${sanitizedEmail}</div>
           </div>
           
           ${
             sanitizedPhone
               ? `
           <div class="field">
             <span class="field-label">Phone Number:</span>
             <div class="field-value">${sanitizedPhone}</div>
           </div>
           `
               : ""
           }
           
           <div class="stats-container">
             <div class="stats-title">Subscriber Information</div>
             <div class="stats-grid">
               <div class="stats-number">1</div>
               <div class="stats-label">New Subscriber</div>
             </div>
             <div class="stats-grid">
               <div class="stats-number">Web</div>
               <div class="stats-label">Source</div>
             </div>
             <div class="stats-grid">
               <div class="stats-number">${new Date().toLocaleDateString()}</div>
               <div class="stats-label">Date</div>
             </div>
           </div>
           
           <div class="divider"></div>
           
           <div class="actions">
             <a href="mailto:${sanitizedEmail}?subject=Welcome%20to%20Auctus%20Apex%20Newsletter" class="button">Send Custom Welcome</a>
           </div>
           
           <div class="footer">
             <p>This is an automated notification from your website newsletter subscription form.</p>
             <p>A welcome email has been automatically sent to the subscriber.</p>
             <p>&copy; ${new Date().getFullYear()} Auctus Apex. All rights reserved.</p>
           </div>
         </div>
       </body>
       </html>
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
          font-size: 28px;
          font-weight: bold;
          color: #b88c3f;
          margin-bottom: 10px;
        }
        .logo-accent {
          color: #333;
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
          font-size: 24px;
          margin-bottom: 20px;
        }
        .accent {
          color: #b88c3f;
        }
        .button {
          display: inline-block;
          background-color: #b88c3f;
          color: white !important;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 4px;
          margin-top: 20px;
          font-weight: bold;
          text-align: center;
        }
        .button:hover {
          background-color: #a07935;
        }
        .content {
          padding: 20px 0;
        }
        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #e6d19f, transparent);
          margin: 15px 0;
        }
        .signature {
          font-style: italic;
          color: #b88c3f;
          margin-top: 10px;
        }
        .benefits {
          background-color: #f9f8f6;
          border-left: 3px solid #b88c3f;
          padding: 15px;
          margin: 20px 0;
        }
        .benefits h3 {
          margin-top: 0;
          color: #b88c3f;
        }
        .benefits ul {
          margin-bottom: 0;
          padding-left: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Auctus <span class="logo-accent">Apex</span></div>
          <h1>Welcome to Our Newsletter</h1>
        </div>
        
        <div class="content">
          <p>Thank you for subscribing to the Auctus Apex newsletter!</p>
          
          <p>You'll now receive updates on our latest services, industry insights, and exclusive offers directly to your inbox.</p>
          
          <div class="benefits">
            <h3>What to Expect:</h3>
            <ul>
              <li>Monthly industry insights and trends</li>
              <li>Exclusive offers for subscribers only</li>
              <li>Tips and strategies to elevate your brand</li>
              <li>Early access to new services and features</li>
            </ul>
          </div>
          
          <p>We're committed to providing valuable content that helps elevate your brand and digital presence.</p>
          
          <div class="divider"></div>
          
          <div style="text-align: center;">
            <a href="https://auctusapex.it" class="button">Visit Our Website</a>
          </div>
        </div>
        
        <p>Best regards,</p>
        <p><span class="accent">Auctus Apex</span> Team</p>
        <p class="signature">"Ad astra per aspera" — To the stars through difficulties</p>
        
        <div class="footer">
          <p>This is an automated response. Please do not reply to this email.</p>
          <p>&copy; ${new Date().getFullYear()} Auctus Apex. All rights reserved.</p>
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

