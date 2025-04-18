"use client"

import { useEffect, useRef, useState } from "react"

interface HeroAnimationProps {
  onLoadingChange?: (isLoading: boolean) => void
}

export default function HeroAnimation({ onLoadingChange }: HeroAnimationProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isBuffering, setIsBuffering] = useState(false)
  const [error, setError] = useState(false)
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Add high priority loading
    video.preload = "auto"
    video.setAttribute("fetchpriority", "high")

    // Preload the video in parallel
    const preloadVideo = () => {
      const linkEl = document.createElement("link")
      linkEl.rel = "preload"
      linkEl.href = useOptimizedVideo
        ? "https://res.cloudinary.com/djlfraoi2/video/upload/q_auto:low,f_auto/v1744848439/wun2xubuflr0gpkazitm.mp4"
        : "https://res.cloudinary.com/djlfraoi2/video/upload/q_auto:good,f_auto/v1744848439/wun2xubuflr0gpkazitm.mp4"
      linkEl.as = "video"
      linkEl.type = "video/mp4"
      document.head.appendChild(linkEl)
    }
    preloadVideo()

    // Handle buffering detection
    const handleBuffering = () => {
      if (video.readyState < 3) {
        setIsBuffering(true)
      } else {
        setIsBuffering(false)
      }
    }

    // Set video dimensions when metadata is loaded
    const handleMetadataLoaded = () => {
      setVideoDimensions({
        width: video.videoWidth,
        height: video.videoHeight,
      })
      // Try to play immediately when metadata is loaded
      video.play().catch((error) => {
        console.log("Video autoplay failed on metadata load:", error)
      })
    }

    // Play video when it's ready
    const handleCanPlay = () => {
      setIsBuffering(false) // Hide buffering indicator as soon as we can play
      video.play().catch((error) => {
        console.log("Video autoplay failed:", error)
        // Try playing on user interaction
        document.addEventListener(
          "click",
          () => {
            video.play().catch((e) => console.log("Still couldn't play video:", e))
          },
          { once: true },
        )
      })
    }

    // Add event listeners
    video.addEventListener("waiting", handleBuffering)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("playing", () => setIsBuffering(false))
    video.addEventListener("progress", handleBuffering)
    video.addEventListener("stalled", handleBuffering)
    video.addEventListener("suspend", handleBuffering)
    video.addEventListener("loadedmetadata", handleMetadataLoaded)

    // Clean up event listeners
    return () => {
      video.removeEventListener("waiting", handleBuffering)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("playing", () => setIsBuffering(false))
      video.removeEventListener("progress", handleBuffering)
      video.removeEventListener("stalled", handleBuffering)
      video.removeEventListener("suspend", handleBuffering)
      video.removeEventListener("loadedmetadata", handleMetadataLoaded)
    }
  }, [])

  // Determine if we should use a lower quality video based on connection speed
  const [useOptimizedVideo, setUseOptimizedVideo] = useState(false)

  useEffect(() => {
    // Check connection speed if available
    if ("connection" in navigator && "effectiveType" in (navigator as any).connection) {
      const connectionType = (navigator as any).connection.effectiveType
      // Use lower quality for slower connections
      if (connectionType === "slow-2g" || connectionType === "2g" || connectionType === "3g") {
        setUseOptimizedVideo(true)
      }
    }
  }, [])

  // Optimize Cloudinary URL with quality and format parameters
  const videoUrl = useOptimizedVideo
    ? "https://res.cloudinary.com/djlfraoi2/video/upload/q_auto:low,f_auto/v1744848439/wun2xubuflr0gpkazitm.mp4"
    : "https://res.cloudinary.com/djlfraoi2/video/upload/q_auto:good,f_auto/v1744848439/wun2xubuflr0gpkazitm.mp4"

  // Fallback video URL
  const fallbackUrl =
    "https://res.cloudinary.com/djlfraoi2/video/upload/q_auto,f_auto/v1744848439/wun2xubuflr0gpkazitm.mp4"

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      // Set aspect ratio with a fixed aspect ratio to prevent layout shifts
      style={{ aspectRatio: "16/9" }}
    >
      {/* Loading indicator */}
      {(isLoading || isBuffering) && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-300 border-t-transparent"></div>
        </div>
      )}

      {/* Video element with explicit width & height */}
      <video
        ref={videoRef}
        className="absolute h-full w-full object-cover"
        autoPlay
        playsInline
        muted
        loop
        preload="auto"
        fetchPriority="high"
        onLoadedData={() => {
          setIsLoading(false)
          if (onLoadingChange) onLoadingChange(false)
        }}
        onError={() => {
          setError(true)
          setIsLoading(false)
          if (onLoadingChange) onLoadingChange(false)
        }}
        poster="https://res.cloudinary.com/djlfraoi2/image/upload/c_scale,w_1280,q_auto:good/v1744848439/wun2xubuflr0gpkazitm.jpg"
        crossOrigin="anonymous"
        style={{ width: "100%", height: "100%" }}
      >
        {/* Primary video source with optimized URL */}
        <source src={videoUrl} type="video/mp4" />
        {/* Fallback video source */}
        <source src={fallbackUrl} type="video/mp4" />
        {/* Special lightweight fallback for instant display */}
        <source
          src="https://res.cloudinary.com/djlfraoi2/video/upload/q_auto:eco,f_auto/v1744848439/wun2xubuflr0gpkazitm.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to darken the video */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Error message */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="rounded bg-red-900 bg-opacity-80 p-4 text-white">
            <p>Video failed to load. Please check the URL.</p>
          </div>
        </div>
      )}
      <style jsx>{`
       video {
         will-change: transform;
         transform: translateZ(0);
       }
     `}</style>
    </div>
  )
}
