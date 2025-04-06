// Update the email template to be more professional
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
       .info-box {
         background-color: #f9f8f6;
         border-left: 3px solid #b88c3f;
         padding: 15px;
         margin: 20px 0;
       }
       .info-box h3 {
         margin-top: 0;
         color: #b88c3f;
       }
     </style>
   </head>
   <body>
     <div class="container">
       <div class="header">
         <div class="logo">Auctus <span class="logo-accent">Apex</span></div>
         <h1>Thank You for Contacting Us</h1>
       </div>
       
       <div class="content">
         <p>Dear ${name},</p>
         
         <p>Thank you for reaching out to Auctus Apex. We have received your message and appreciate your interest in our services.</p>
         
         <p>Our team will review your inquiry and get back to you as soon as possible, typically within 1-2 business days.</p>
         
         <div class="info-box">
           <h3>What to Expect Next:</h3>
           <ul>
             <li>A member of our team will carefully review your message</li>
             <li>We may reach out for additional information if needed</li>
             <li>You'll receive a personalized response addressing your specific inquiry</li>
           </ul>
         </div>
         
         <p>If your matter requires immediate attention, please don't hesitate to call us at <span class="accent">+1 (484) 536-9423</span>.</p>
         
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
 `
}

// Make sure the default export function is properly defined
export default function confirmationEmailTemplate(name: string) {
  return createConfirmationEmail(name)
}

