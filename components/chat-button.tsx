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

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-24 right-6 z-50 bg-amber-700 text-white rounded-full p-3 shadow-lg hover:bg-amber-800 transition-colors"
      aria-label="Start new chat"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="12" y1="11" x2="12" y2="11" />
        <line x1="8" y1="11" x2="8" y2="11" />
        <line x1="16" y1="11" x2="16" y2="11" />
      </svg>
    </button>
  )
}
