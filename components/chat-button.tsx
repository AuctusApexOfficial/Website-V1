"use client"

import { useEffect, useState } from "react"

declare global {
  interface Window {
    voiceflow?: {
      chat: {
        load: (config: any) => any
        open: () => void
        close: () => void
      }
    }
    voiceflowWidget?: any
    startNewChat?: () => void
  }
}

export default function ChatButton() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Check if chat functionality is available
    const checkChatAvailability = () => {
      if (typeof window.startNewChat === "function") {
        setIsReady(true)
        return true
      }
      return false
    }

    // Initial check
    const initialCheck = setTimeout(() => {
      checkChatAvailability()
    }, 2000)

    // Set up periodic checks
    const interval = setInterval(() => {
      checkChatAvailability()
    }, 3000)

    return () => {
      clearTimeout(initialCheck)
      clearInterval(interval)
    }
  }, [])

  const handleClick = () => {
    console.log("Chat button clicked")

    // If the startNewChat function exists, use it
    if (typeof window.startNewChat === "function") {
      window.startNewChat()
      return
    }

    // Fallback: Try to access Voiceflow directly
    if (window.voiceflow && window.voiceflow.chat) {
      try {
        window.voiceflow.chat.close()
        setTimeout(() => {
          window.voiceflow.chat.open()
        }, 300)
      } catch (error) {
        console.error("Error using direct Voiceflow access:", error)
      }
      return
    }
  }

  return null
}
