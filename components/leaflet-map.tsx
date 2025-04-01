"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"

interface Location {
  id: string
  name: string
  state: string
  country: string
  position: [number, number]
}

interface LeafletMapProps {
  locations: Location[]
}

export default function LeafletMap({ locations }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isMapInitialized, setIsMapInitialized] = useState(false)

  // Initialize map after scripts are loaded
  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current || typeof window === "undefined") return

    let map: any = null
    let L: any = null
    let initializationAttempts = 0
    const MAX_ATTEMPTS = 3

    // Function to initialize the map with better error handling
    const initializeMap = () => {
      initializationAttempts++
      console.log(`Initializing map (attempt ${initializationAttempts})...`)

      try {
        // Get Leaflet from window object
        L = (window as any).L
        if (!L) {
          if (initializationAttempts < MAX_ATTEMPTS) {
            console.log("Leaflet not loaded yet, retrying in 1 second...")
            setTimeout(initializeMap, 1000)
            return
          }
          throw new Error("Leaflet not loaded on window object after multiple attempts")
        }

        // Create custom icon
        const customIcon = L.divIcon({
          className: "custom-icon",
          html: `<div style="
            width: 18px;
            height: 18px;
            border-radius: 50% 50% 50% 0;
            background: #b88c3f;
            position: absolute;
            transform: rotate(-45deg);
            left: 50%;
            top: 50%;
            margin: -15px 0 0 -9px;
            box-shadow: 0 0 4px rgba(184, 140, 63, 0.5);
          "><div style="
            width: 10px;
            height: 10px;
            margin: 4px 0 0 4px;
            background: #fff8e6;
            position: absolute;
            border-radius: 50%;
          "></div></div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
        })

        // Initialize map with timeout handling
        map = L.map(mapRef.current, {
          center: [30, 0],
          zoom: 2,
          minZoom: 2,
          maxZoom: 18,
          zoomControl: false,
          attributionControl: false,
          // Add timeout options
          zoomSnap: 1,
          zoomDelta: 1,
          wheelPxPerZoomLevel: 120,
          // Increase timeout to avoid the timeout error
          zoomAnimationThreshold: 4,
        })

        // Primary tile layer with error handling
        const mainTileLayer = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
          subdomains: "abcd",
          maxZoom: 20,
          // Add error handling for tiles
          errorTileUrl:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
        })

        // Fallback tile layer in case the primary fails
        const fallbackTileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          errorTileUrl:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
        })

        // Try to add the main tile layer first
        mainTileLayer.on("tileerror", () => {
          console.log("Error loading CartoDB tiles, switching to OpenStreetMap")
          if (!map.hasLayer(fallbackTileLayer)) {
            fallbackTileLayer.addTo(map)
          }
        })

        mainTileLayer.addTo(map)

        // Add markers for each location with simplified popup handling
        locations.forEach((location) => {
          const marker = L.marker(location.position, { icon: customIcon }).addTo(map)

          // Create popup content
          const popupContent = `
            <div style="font-family: serif;">
              <div style="font-weight: 600; color: #b88c3f; font-size: 16px;">${location.name}</div>
              <div style="color: #78716c; font-size: 14px;">
                ${location.country}
              </div>
            </div>
          `

          // Simplified popup binding
          marker.bindPopup(popupContent, {
            closeButton: false,
            offset: [0, -20],
            className: "custom-popup",
          })

          // Show popup on hover
          marker.on("mouseover", function () {
            this.openPopup()
          })

          // Close on mouseout
          marker.on("mouseout", function () {
            this.closePopup()
          })
        })

        // Add zoom controls
        L.control
          .zoom({
            position: "topright",
            zoomInTitle: "Zoom in",
            zoomOutTitle: "Zoom out",
          })
          .addTo(map)

        setIsMapInitialized(true)
        console.log("Map initialized successfully")
      } catch (err) {
        console.error("Error initializing map:", err)

        // Retry initialization if under max attempts
        if (initializationAttempts < MAX_ATTEMPTS) {
          console.log(`Retrying map initialization in ${initializationAttempts * 1000}ms...`)
          setTimeout(initializeMap, initializationAttempts * 1000)
        } else {
          setError(`Failed to initialize map: ${err instanceof Error ? err.message : String(err)}`)
        }
      }
    }

    // Start initialization with a slight delay to ensure DOM is ready
    const timeoutId = setTimeout(initializeMap, 800)

    // Cleanup function
    return () => {
      clearTimeout(timeoutId)
      if (map) {
        console.log("Removing map...")
        map.remove()
      }
    }
  }, [isScriptLoaded, locations])

  // Show error if there is one
  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-amber-50/50">
        <div className="text-center p-4">
          <p className="text-amber-700 font-medium">Unable to load map</p>
          <p className="text-gray-600 text-sm mt-2">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Load Leaflet CSS and JS from CDN */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin="anonymous"
      />
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin="anonymous"
        onLoad={() => setIsScriptLoaded(true)}
        strategy="afterInteractive"
      />

      {/* Map container */}
      <div ref={mapRef} className="h-full w-full border border-amber-200 rounded-lg overflow-hidden bg-amber-50/20">
        {!isMapInitialized && !error && (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-amber-700">Loading map...</div>
          </div>
        )}
      </div>

      {/* Custom styles for Leaflet controls */}
      <style jsx global>{`
        .leaflet-control-zoom-in, .leaflet-control-zoom-out {
          background-color: white !important;
          color: #b88c3f !important;
          border: 1px solid #e6d19f !important;
        }
        .leaflet-control-zoom-in:hover, .leaflet-control-zoom-out:hover {
          background-color: #fff8e6 !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 3px 14px rgba(184, 140, 63, 0.2);
          border: 1px solid rgba(184, 140, 63, 0.3);
          padding: 8px 12px;
          transition: all 0.2s ease;
        }
        .leaflet-popup-tip {
          background-color: white;
          border: 1px solid rgba(184, 140, 63, 0.3);
          box-shadow: 0 3px 14px rgba(184, 140, 63, 0.1);
        }
        .leaflet-popup-content {
          margin: 8px;
          min-width: 120px;
        }
        .custom-popup .leaflet-popup-content-wrapper {
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}

