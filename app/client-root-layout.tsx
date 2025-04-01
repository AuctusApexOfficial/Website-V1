"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function ClientRootLayout() {
  return <ScrollToTop />
}

// Component to handle scrolling to top on route changes
function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

