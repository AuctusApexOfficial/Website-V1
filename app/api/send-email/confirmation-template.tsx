export const createConfirmationEmail = (name: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank you for contacting Auctus Apex</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .container {
          padding: 20px;
          border: 1px solid #e6d19f;
          border-radius: 5px;
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #e6d19f;
          margin-bottom: 20px;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e6d19f;
          font-size: 12px;
          color: #777;
        }
        h1 {
          color: #b88c3f;
        }
        .accent {
          color: #b88c3f;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Contacting Us</h1>
        </div>
        
        <p>Dear ${name},</p>
        
        <p>Thank you for reaching out to Auctus Apex. We have received your message and appreciate your interest in our services.</p>
        
        <p>Our team will review your inquiry and get back to you as soon as possible, typically within 1-2 business days.</p>
        
        <p>If your matter requires immediate attention, please don't hesitate to call us at <span class="accent">+1 (484) 536-9423</span>.</p>
        
        <p>Best regards,</p>
        <p><span class="accent">Auctus Apex</span> Team</p>
        
        <div class="footer">
          <p>This is an automated response. Please do not reply to this email.</p>
          <p>© ${new Date().getFullYear()} Auctus Apex. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Make sure the default export function is properly defined
export default function confirmationEmailTemplate(name: string) {
  return createConfirmationEmail(name)
}

