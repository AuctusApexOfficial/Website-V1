"use client"

import { useState, useEffect } from "react"

export default function MapComponent() {
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Only render the map when the component is mounted on the client
  useEffect(() => {
    setIsMounted(true)

    // Set a timeout to hide the loading indicator after a few seconds
    // even if the iframe doesn't trigger the onLoad event
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleVideoLoad = () => {
    setIsLoading(false)
  }

  const handleVideoError = () => {
    setIsLoading(false)
  }

  if (!isMounted) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-amber-50/50">
        <div className="text-center p-4">
          <p className="text-amber-700 font-medium">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full bg-amber-50/50 rounded-lg border border-amber-200 overflow-hidden relative">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-amber-50/90 z-10">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-amber-700 border-t-transparent"></div>
            <p className="mt-2 text-amber-700">Loading Google Earth...</p>
          </div>
        </div>
      )}

      {/* Video Player */}
      <video
        src="https://res.cloudinary.com/djlfraoi2/video/upload/v1743592298/lcplej4eoq66ymouxwvn.mp4"
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
      >
        Your browser does not support the video tag.
      </video>

      {/* Fallback link */}
      <div className="absolute bottom-4 left-4 z-20">
        <a
          href="https://earth.google.com/web/@43.06974538,7.17245691,164.76045531a,2103588.36819112d,35y,0h,0t,0r/data=CgRCAggBMikKJwolCiExQ2ExRURmdTBoU2ppcTBweWYtVEJmcjZMVFFGOXI3dEkgAToDCgEwQgIIAEoICKL3yv0FEAE"
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif text-xs text-white/70 hover:text-white/90 transition-colors tracking-wider"
          style={{ letterSpacing: "0.2em" }}
        >
          OPEN
        </a>
      </div>
    </div>
  )
}
