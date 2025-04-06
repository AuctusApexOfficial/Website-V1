"use client"

import { useEffect, useRef, useState } from "react"

export default function HeroAnimation() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isBuffering, setIsBuffering] = useState(false)
  const [error, setError] = useState(false)
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Preload the video
    video.preload = "auto"

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
    }

    // Play video when it's ready
    const handleCanPlay = () => {
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

  // Use multiple video sources with different formats for better compatibility
  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* Loading indicator */}
      {(isLoading || isBuffering) && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-300 border-t-transparent"></div>
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setIsLoading(false)}
        onError={() => {
          setError(true)
          setIsLoading(false)
        }}
        poster="/placeholder.svg?height=1080&width=1920"
      >
        {/* Primary video source with multiple formats for better compatibility */}
        <source
          src="https://res.cloudinary.com/djlfraoi2/video/upload/q_auto,f_auto/v1743931975/vkmrm4hsp46yoyt47wjr.mp4"
          type="video/mp4"
        />
        {/* Fallback video source with WebM format */}
        <source
          src="https://res.cloudinary.com/djlfraoi2/video/upload/q_auto,f_webm/v1743931975/vkmrm4hsp46yoyt47wjr.webm"
          type="video/webm"
        />
        {/* Lower quality fallback */}
        <source
          src="https://res.cloudinary.com/djlfraoi2/video/upload/q_auto:low,f_auto/v1743931975/vkmrm4hsp46yoyt47wjr.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Static image fallback for when video fails completely */}
      {error && (
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/djlfraoi2/image/upload/v1743310313/fsvgy6x1469zf5p8jkmj.png"
            alt="Hero background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
      )}

      {/* Overlay to darken the video */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
    </div>
  )
}

