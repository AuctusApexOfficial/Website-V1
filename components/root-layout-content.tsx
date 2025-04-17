"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "./navbar"
import Footer from "./footer"
import AnimatedCursor from "./animated-cursor"
import ScrollProgress from "./scroll-progress"
import ChatButton from "./chat-button"

export default function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [showChatButton, setShowChatButton] = useState(false)

  useEffect(() => {
    // Hide loading state after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Show chat button after loading is complete
      setTimeout(() => {
        setShowChatButton(true)
      }, 1000)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Don't show the chat button on loading pages
  const isLoadingPage = pathname?.includes("/loading") || pathname?.endsWith("/loading")

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <AnimatedCursor />
      <ScrollProgress />
      {showChatButton && !isLoadingPage && <ChatButton />}
    </>
  )
}
