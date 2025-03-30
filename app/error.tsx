"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 p-4 text-center">
      <h2 className="mb-4 font-serif text-2xl font-bold text-amber-700">Something went wrong</h2>
      <p className="mb-8 max-w-md text-gray-600">We apologize for the inconvenience. Please try refreshing the page.</p>
      <div className="flex gap-4">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="bg-amber-700 text-white hover:bg-amber-800"
        >
          Try again
        </Button>
        <Button
          onClick={() => (window.location.href = "/")}
          variant="outline"
          className="border-amber-700 text-amber-700 hover:bg-amber-50"
        >
          Go to homepage
        </Button>
      </div>
    </div>
  )
}

