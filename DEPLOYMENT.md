# Deployment Checklist for Auctus Apex

## Prerequisites
- [x] Resend API key is set up in Vercel project
- [x] auctusapex.com domain is verified with Resend
- [x] All environment variables are configured in Vercel

## Environment Variables
Make sure the following environment variables are set in your Vercel project:

- `RESEND_API_KEY`: Your Resend API key
- `CALENDLY_API_KEY`: Your Calendly API key (if using Calendly integration)

## Deployment Steps

1. Push your code to a GitHub repository
2. Connect the repository to Vercel
3. Configure the environment variables in the Vercel project settings
4. Deploy the project

## Post-Deployment Checks

- [ ] Verify that the website loads correctly
- [ ] Test the contact form functionality
- [ ] Test the newsletter subscription functionality
- [ ] Check that emails are being sent from no-reply@auctusapex.com
- [ ] Verify that notification emails are being received at info@auctusapex.com

## Troubleshooting

If emails are not being sent:

1. Check the Vercel logs for any errors
2. Verify that the Resend API key is correctly set in the environment variables
3. Ensure that the auctusapex.com domain is properly verified with Resend
4. Test the email functionality with a simple test email

## Notes

- The contact form sends emails to info@auctusapex.com
- The newsletter subscription form sends emails to info@auctusapex.com
- All outgoing emails are sent from no-reply@auctusapex.com

