"use client"

import type React from "react"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { LanguageProvider, useLanguage } from "@/contexts/language-context"
import ClientRootLayout from "./client-root-layout"
import StandardLoading from "@/components/standard-loading"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

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
        </LanguageProvider>
      </body>
    </html>
  )
}

// Create a client component that can access the context
function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { loading } = useLanguage()

  return (
    <>
      {loading && <StandardLoading />}
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <ClientRootLayout />
    </>
  )
}
