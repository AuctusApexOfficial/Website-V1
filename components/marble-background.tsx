"use client"

import { useEffect, useState } from "react"

interface MarbleBackgroundProps {
  className?: string
  variant?: "light" | "medium" | "dark"
  opacity?: number
}

export default function MarbleBackground({ className = "", variant = "light", opacity = 0.15 }: MarbleBackgroundProps) {
  const [loaded, setLoaded] = useState(false)

  // Select the appropriate marble texture based on variant
  const getMarbleTexture = () => {
    switch (variant) {
      case "medium":
        return "/marble-texture-medium.png"
      case "dark":
        return "/marble-texture-dark.png"
      case "light":
      default:
        return "/marble-texture-light.png"
    }
  }

  useEffect(() => {
    // Simulate loading to prevent layout shift
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className} ${loaded ? "opacity-100" : "opacity-0"}`}
      style={{
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <div
        className="absolute inset-0 bg-repeat"
        style={{
          backgroundImage: `url(${getMarbleTexture()})`,
          opacity,
          backgroundSize: "600px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/70" />
    </div>
  )
}
