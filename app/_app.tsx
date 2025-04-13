"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // Handle scrolling to top when routes change
    const handleRouteChange = () => {
      window.scrollTo(0, 0)
    }

    router.events.on("routeChangeComplete", handleRouteChange)

    // Clean up the event listener when the component unmounts
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}

export default MyApp
