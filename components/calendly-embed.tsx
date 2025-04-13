"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Script from "next/script"

interface CalendlyEmbedProps {
  url: string
  styles?: React.CSSProperties
  className?: string
  prefill?: {
    name?: string
    email?: string
    customAnswers?: {
      [key: string]: string
    }
  }
}

export default function CalendlyEmbed({ url, styles, className, prefill }: CalendlyEmbedProps) {
  const calendlyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run if Calendly is loaded and the ref is available
    if (window.Calendly && calendlyRef.current) {
      // Clear any existing content
      if (calendlyRef.current.innerHTML !== "") {
        calendlyRef.current.innerHTML = ""
      }

      // Initialize Calendly inline widget
      window.Calendly.initInlineWidget({
        url,
        parentElement: calendlyRef.current,
        prefill: prefill || {},
      })
    }

    // Cleanup function
    return () => {
      if (calendlyRef.current) {
        calendlyRef.current.innerHTML = ""
      }
    }
  }, [url, prefill])

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.Calendly && calendlyRef.current) {
            window.Calendly.initInlineWidget({
              url,
              parentElement: calendlyRef.current,
              prefill: prefill || {},
            })
          }
        }}
      />
      <div
        ref={calendlyRef}
        className={className || "calendly-inline-widget"}
        style={{ minWidth: "320px", height: "700px", ...styles }}
        data-auto-load="false"
      />
    </>
  )
}
