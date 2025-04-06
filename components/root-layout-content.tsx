"use client"

import type React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ClientRootLayout from "@/app/client-root-layout"
import StandardLoading from "@/components/standard-loading"
import { useLanguage } from "@/contexts/language-context"

// Simplify the component to always render the loading screen when loading is true
export default function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { loading } = useLanguage()

  return (
    <>
      {loading && <StandardLoading />}
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ClientRootLayout />
    </>
  )
}

