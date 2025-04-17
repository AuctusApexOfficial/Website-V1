"use client"

import type { ReactNode, FormEvent } from "react"
import { createHoneypotField, useTimingAnalysis, honeypotFieldNames } from "@/utils/bot-protection"
import { generateCSRFToken, validateCSRFToken } from "@/utils/security"
import { useState, useEffect } from "react"

interface BotProtectedFormProps {
  children: ReactNode
  onSubmit: (e: FormEvent) => void
  className?: string
}

export default function BotProtectedForm({ children, onSubmit, className = "" }: BotProtectedFormProps) {
  const { isSuspicious } = useTimingAnalysis()
  const [csrfToken, setCsrfToken] = useState("")

  // Random honeypot field name from our list
  const honeypotField = honeypotFieldNames[Math.floor(Math.random() * honeypotFieldNames.length)]

  useEffect(() => {
    // Generate a new CSRF token on component mount
    setCsrfToken(generateCSRFToken())
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Check for honeypot field being filled (bots often fill hidden fields)
    const form = e.target as HTMLFormElement
    const honeypotValue = (form.elements.namedItem(honeypotField) as HTMLInputElement)?.value
    const submittedCsrfToken = (form.elements.namedItem("csrfToken") as HTMLInputElement)?.value

    if (honeypotValue || isSuspicious || !validateCSRFToken(submittedCsrfToken, csrfToken)) {
      console.log("Bot detected, preventing submission")
      return
    }

    // If all checks pass, call the original onSubmit
    onSubmit(e)

    // Generate a new CSRF token after successful submission
    setCsrfToken(generateCSRFToken())
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* CSRF token hidden input */}
      <input type="hidden" name="csrfToken" value={csrfToken} />

      {children}

      {/* Invisible honeypot field to catch bots */}
      {createHoneypotField(honeypotField)}
    </form>
  )
}
