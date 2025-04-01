import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"
import ClientRootLayout from "./client-root-layout"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ClientRootLayout />
        </LanguageProvider>
      </body>
    </html>
  )
}



import './globals.css'