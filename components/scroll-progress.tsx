"use client"

import { useScroll, motion } from "framer-motion"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-amber-400 to-amber-600"
      style={{ scaleX: scrollYProgress, opacity: scrollYProgress }}
    />
  )
}
