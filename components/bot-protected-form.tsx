"use client"

import type { ReactNode, FormEvent } from "react"
import { useTimingAnalysis, honeypotFieldNames, createHoneypotField } from "@/utils/bot-protection"

interface BotProtectedFormProps {
  children: ReactNode
  onSubmit: (e: FormEvent) => void
  className?: string
}

export default function BotProtectedForm({ children, onSubmit, className = "" }: BotProtectedFormProps) {
  const { isSuspicious } = useTimingAnalysis()

  // Random honeypot field name from our list
  const honeypotField = honeypotFieldNames[Math.floor(Math.random() * honeypotFieldNames.length)]

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Check for honeypot field being filled (bots often fill hidden fields)
    const form = e.target as HTMLFormElement
    const honeypotValue = (form.elements.namedItem(honeypotField) as HTMLInputElement)?.value

    if (honeypotValue || isSuspicious) {
      console.log("Bot detected, preventing submission")
      return
    }

    // If all checks pass, call the original onSubmit
    onSubmit(e)
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}

      {/* Invisible honeypot field to catch bots */}
      {createHoneypotField(honeypotField)}
    </form>
  )
}

