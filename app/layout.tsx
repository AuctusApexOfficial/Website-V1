import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import RootLayoutContent from "@/components/root-layout-content"
import { Toaster } from "@/components/ui/toaster"

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
  description: "Elevate your brand with sophisticated marketing strategies and bespoke web design solutions.",
  generator: "v0.dev",
}

// Make sure the layout is properly set up to handle the loading state
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <LanguageProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  )
}



import './globals.css'