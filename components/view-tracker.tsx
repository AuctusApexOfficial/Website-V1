"use client"

import { useEffect, useState } from "react"
import { incrementViewCount } from "@/app/actions/view-counter"

interface ViewTrackerProps {
  articleId: number
}

export default function ViewTracker({ articleId }: ViewTrackerProps) {
  const [viewCount, setViewCount] = useState<number | null>(null)

  useEffect(() => {
    // Only track the view once when the component mounts
    const trackView = async () => {
      try {
        // We only want to count a view once per session for this article
        const viewedArticles = JSON.parse(sessionStorage.getItem("viewedArticles") || "{}")

        // If this article hasn't been viewed in this session, increment the count
        if (!viewedArticles[articleId]) {
          const newCount = await incrementViewCount(articleId)
          setViewCount(newCount)

          // Mark this article as viewed in this session
          viewedArticles[articleId] = true
          sessionStorage.setItem("viewedArticles", JSON.stringify(viewedArticles))
        }
      } catch (error) {
        console.error("Failed to track article view:", error)
      }
    }

    trackView()
  }, [articleId])

  // This component doesn't render anything visible
  return null
}
