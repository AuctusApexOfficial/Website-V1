"use client"

import { useState, useEffect } from "react"

// Bot detection patterns
const botPatterns = [/bot/i, /crawl/i, /spider/i, /headless/i, /phantom/i, /selenium/i, /puppeteer/i]

// Simplified honeypot field names
export const honeypotFieldNames = ["website", "url", "email_confirm", "phone_confirm"]

// Check if the user agent matches known bot patterns
export function isBotUserAgent(userAgent: string): boolean {
  return botPatterns.some((pattern) => pattern.test(userAgent))
}

// Check for suspicious behavior like filling forms too quickly
export function useTimingAnalysis(thresholdMs = 3000) {
  const [startTime] = useState<number>(Date.now())
  const [isSuspicious, setIsSuspicious] = useState<boolean>(false)

  const checkTiming = () => {
    const elapsedTime = Date.now() - startTime
    return elapsedTime < thresholdMs
  }

  useEffect(() => {
    // Check if form was filled too quickly (likely a bot)
    const checkSuspiciousTiming = () => {
      if (checkTiming()) {
        setIsSuspicious(true)
      }
    }

    // Add event listeners to detect suspicious behavior
    document.addEventListener("submit", checkSuspiciousTiming)

    return () => {
      document.removeEventListener("submit", checkSuspiciousTiming)
    }
  }, [])

  return { isSuspicious, checkTiming }
}

// Create a honeypot field component
export function createHoneypotField(name: string) {
  return (
    <div style={{ opacity: 0, position: "absolute", top: "-9999px", left: "-9999px" }}>
      <input type="text" name={name} id={name} tabIndex={-1} autoComplete="off" />
    </div>
  )
}

// Rate limiting for API routes
const ipRequestCounts: Record<string, { count: number; timestamp: number }> = {}

export function checkRateLimit(ip: string, maxRequests = 10, windowMs = 60000): boolean {
  const now = Date.now()

  // Clean up old entries
  Object.keys(ipRequestCounts).forEach((key) => {
    if (now - ipRequestCounts[key].timestamp > windowMs) {
      delete ipRequestCounts[key]
    }
  })

  // Initialize or update the request count for this IP
  if (!ipRequestCounts[ip]) {
    ipRequestCounts[ip] = { count: 1, timestamp: now }
    return false // Not rate limited
  }

  // Check if within the same time window
  if (now - ipRequestCounts[ip].timestamp < windowMs) {
    ipRequestCounts[ip].count++
    return ipRequestCounts[ip].count > maxRequests // Rate limited if too many requests
  } else {
    // Reset for a new time window
    ipRequestCounts[ip] = { count: 1, timestamp: now }
    return false
  }
}

