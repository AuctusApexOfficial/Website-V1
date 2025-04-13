import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import RootLayoutContent from "@/components/root-layout-content"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Auctus Apex | Premium Marketing & Web Design",
  description:
    "Auctus Apex offers cutting-edge digital marketing, web development, and AI solutions. We help businesses grow through strategic marketing, innovative web design, and advanced AI development for the future.",
  generator: "v0.dev",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", sizes: "192x192" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Auctus Apex | Premium Marketing & Web Design",
    description:
      "Auctus Apex offers cutting-edge digital marketing, web development, and AI solutions. We help businesses grow through strategic marketing, innovative web design, and advanced AI development for the future.",
    url: "https://auctusapex.com",
    siteName: "Auctus Apex",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Auctus Apex - Premium Marketing & Web Design",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auctus Apex | Premium Marketing & Web Design",
    description:
      "Auctus Apex offers cutting-edge digital marketing, web development, and AI solutions. We help businesses grow through strategic marketing, innovative web design, and advanced AI development for the future.",
    images: ["/twitter-image.png"],
  },
}

// Make sure the layout is properly set up to handle the loading state
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.voiceflow.com" />
        <link rel="preconnect" href="https://general-runtime.voiceflow.com" />
        <link rel="preconnect" href="https://runtime-api.voiceflow.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {/* Script to load Voiceflow and handle positioning */}
        <Script
          id="voiceflow-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Load Voiceflow
              (function(d, t) {
                var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
                v.onload = function() {
                  try {
                    // Initialize the Voiceflow chat widget
                    window.voiceflowWidget = window.voiceflow.chat.load({
                      verify: { projectID: '67f6bd5f2cdeec21050d450c' },
                      url: 'https://general-runtime.voiceflow.com',
                      versionID: '67f6bd5f2cdeec21050d450d',
                      voice: {
                        url: "https://runtime-api.voiceflow.com"
                      }
                    });
                    
                    // Create a simple function to restart the chat
                    window.startNewChat = function() {
                      try {
                        // Close the current chat
                        window.voiceflow.chat.close();
                        
                        // Wait a moment and reopen
                        setTimeout(function() {
                          window.voiceflow.chat.open();
                        }, 300);
                      } catch (e) {
                        console.error('Error restarting chat:', e);
                      }
                    };
                    
                    // Add CSS to fix positioning and hide the lower chatbox
                    setTimeout(function() {
                      // Create a style element
                      var style = document.createElement('style');
                      style.textContent = \`
                        /* Hide the second chat button (if any) */
                        .vfrc-button:nth-of-type(2) {
                          display: none !important;
                        }
                        
                        /* Hide the second chat container (if any) */
                        .vfrc-chat:nth-of-type(2) {
                          display: none !important;
                        }
                        
                        /* Position the first chat button at the bottom */
                        .vfrc-button:nth-of-type(1) {
                          bottom: 20px !important;
                          top: auto !important;
                        }
                        
                        /* Ensure proper z-index */
                        .vfrc-button, .vfrc-chat {
                          z-index: 9999 !important;
                        }
                      \`;
                      document.head.appendChild(style);
                    }, 1000);
                  } catch (err) {
                    console.error('Error initializing Voiceflow chat:', err);
                  }
                };
                v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
                v.type = "text/javascript";
                v.onerror = function() {
                  console.error('Failed to load Voiceflow chat widget');
                };
                s.parentNode.insertBefore(v, s);
              })(document, 'script');
            `,
          }}
        />

        <LanguageProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}


import './globals.css'