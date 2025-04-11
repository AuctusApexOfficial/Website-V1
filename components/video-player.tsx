"use client"

import { useState, useEffect, useRef } from "react"

interface VideoPlayerProps {
  src: string
  type?: "youtube" | "vimeo" | "mp4" | "auto"
  title?: string
  poster?: string
  autoPlay?: boolean
  muted?: boolean
  controls?: boolean
  loop?: boolean
  className?: string
  aspectRatio?: "16:9" | "4:3" | "1:1" | "9:16"
}

export default function VideoPlayer({
  src,
  type = "auto",
  title = "Video player",
  poster,
  autoPlay = false,
  muted = false,
  controls = true,
  loop = false,
  className = "",
  aspectRatio = "16:9",
}: VideoPlayerProps) {
  const [videoType, setVideoType] = useState(type)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Determine aspect ratio padding
  const aspectRatioPadding = {
    "16:9": "pb-[56.25%]", // 9/16 = 0.5625 or 56.25%
    "4:3": "pb-[75%]", // 3/4 = 0.75 or 75%
    "1:1": "pb-[100%]", // 1/1 = 1 or 100%
    "9:16": "pb-[177.78%]", // 16/9 = 1.7778 or 177.78%
  }[aspectRatio]

  // Auto-detect video type if not specified
  useEffect(() => {
    if (type === "auto") {
      if (src.includes("youtube.com") || src.includes("youtu.be")) {
        setVideoType("youtube")
      } else if (src.includes("vimeo.com")) {
        setVideoType("vimeo")
      } else {
        setVideoType("mp4")
      }
    }
  }, [src, type])

  // Handle video loading
  useEffect(() => {
    setIsLoading(true)
    setError(null)
  }, [src])

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  // Extract Vimeo video ID from URL
  const getVimeoId = (url: string) => {
    const regExp =
      /vimeo\.com\/(?:video\/|channels\/[^/]+\/|groups\/[^/]+\/videos\/|album\/[^/]+\/video\/|)(\d+)(?:$|\/|\?)/
    const match = url.match(regExp)
    return match ? match[1] : null
  }

  const handleVideoLoad = () => {
    setIsLoading(false)
  }

  const handleVideoError = () => {
    setIsLoading(false)
    setError("Failed to load video. Please try again later.")
  }

  // Render different video players based on type
  const renderVideoPlayer = () => {
    switch (videoType) {
      case "youtube": {
        const youtubeId = getYouTubeId(src)
        if (!youtubeId) {
          return <div className="text-red-500">Invalid YouTube URL</div>
        }

        const youtubeParams = new URLSearchParams({
          autoplay: autoPlay ? "1" : "0",
          mute: muted ? "1" : "0",
          controls: controls ? "1" : "0",
          loop: loop ? "1" : "0",
          rel: "0",
          modestbranding: "1",
        }).toString()

        return (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?${youtubeParams}`}
            title={title}
            className="absolute top-0 left-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleVideoLoad}
            onError={handleVideoError}
          ></iframe>
        )
      }

      case "vimeo": {
        const vimeoId = getVimeoId(src)
        if (!vimeoId) {
          return <div className="text-red-500">Invalid Vimeo URL</div>
        }

        const vimeoParams = new URLSearchParams({
          autoplay: autoPlay ? "1" : "0",
          muted: muted ? "1" : "0",
          controls: controls ? "1" : "0",
          loop: loop ? "1" : "0",
          title: "1",
          byline: "0",
          portrait: "0",
        }).toString()

        return (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?${vimeoParams}`}
            title={title}
            className="absolute top-0 left-0 h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            onLoad={handleVideoLoad}
            onError={handleVideoError}
          ></iframe>
        )
      }

      case "mp4":
      default:
        return (
          <video
            ref={videoRef}
            poster={poster}
            controls={controls}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline
            className="absolute top-0 left-0 h-full w-full object-cover"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            crossOrigin="anonymous"
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className={`relative ${aspectRatioPadding}`}>
        {renderVideoPlayer()}

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-amber-700 border-t-transparent"></div>
              <p className="mt-2 text-amber-700">Loading video...</p>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="rounded-lg bg-white p-4 shadow-lg">
              <p className="text-red-500">{error}</p>
              <button
                className="mt-2 rounded bg-amber-700 px-4 py-2 text-white hover:bg-amber-800"
                onClick={() => window.open(src, "_blank")}
              >
                Open video in new tab
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
