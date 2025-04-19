import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import "./cls-fix.css"
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
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Auctus Apex | Premium Marketing & Web Design",
    description:
      "Auctus Apex offers cutting-edge digital marketing, web development, and AI solutions. We help businesses grow through strategic marketing, innovative web design, and advanced AI development for the future.",
    url: "https://auctusapex.it",
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

        {/* Font preloads */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          as="style"
        />

        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ✅ JSON-LD for Organization + Logo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Auctus Apex",
              url: "https://auctusapex.it",
              logo: "https://auctusapex.it/favicon-512x512.png",
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
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
                    window.voiceflowWidget = window.voiceflow.chat.load({
                      verify: { projectID: '67f6bd5f2cdeec21050d450c' },
                      url: 'https://general-runtime.voiceflow.com',
                      versionID: '67f6bd5f2cdeec21050d450d',
                      voice: { url: "https://runtime-api.voiceflow.com" }
                    });

                    window.startNewChat = function() {
                      try {
                        window.voiceflow.chat.close();
                        setTimeout(function() {
                          window.voiceflow.chat.open();
                        }, 300);
                      } catch (e) {
                        console.error('Error restarting chat:', e);
                      }
                    };

                    setTimeout(function() {
                      var style = document.createElement('style');
                      style.textContent = \`
                        .vfrc-button:nth-of-type(2) {
                          display: none !important;
                        }
                        .vfrc-chat:nth-of-type(2) {
                          display: none !important;
                        }
                        .vfrc-button:nth-of-type(1) {
                          bottom: 20px !important;
                          top: auto !important;
                        }
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
