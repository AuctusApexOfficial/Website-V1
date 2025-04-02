"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface ImageRevealProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  revealDirection?: "left" | "right" | "top" | "bottom"
}

export default function ImageReveal({
  src,
  alt,
  width,
  height,
  className = "",
  revealDirection = "left",
}: ImageRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  // Set initial and animate properties based on reveal direction
  const getDirectionalVariants = () => {
    switch (revealDirection) {
      case "right":
        return {
          hidden: { clipPath: "inset(0 100% 0 0)" },
          visible: { clipPath: "inset(0 0% 0 0)" },
        }
      case "top":
        return {
          hidden: { clipPath: "inset(100% 0 0 0)" },
          visible: { clipPath: "inset(0% 0 0 0)" },
        }
      case "bottom":
        return {
          hidden: { clipPath: "inset(0 0 100% 0)" },
          visible: { clipPath: "inset(0 0 0% 0)" },
        }
      case "left":
      default:
        return {
          hidden: { clipPath: "inset(0 0 0 100%)" },
          visible: { clipPath: "inset(0 0 0 0%)" },
        }
    }
  }

  const variants = getDirectionalVariants()

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full"
      >
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="h-full w-full object-cover"
          style={{
            filter: src?.includes("luxury-ecommerce") ? "brightness(1.1) contrast(1.05)" : "brightness(1.4)",
          }}
        />
      </motion.div>
    </div>
  )
}

