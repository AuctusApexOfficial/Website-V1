"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="min-h-screen bg-taupe-50 flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-24 h-24 mx-auto mb-6">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-t-gold-600 border-r-gold-400 border-b-gold-300 border-l-gold-200"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>
        <h2 className="font-serif text-2xl text-gold-600">Loading Articles</h2>
        <p className="text-taupe-600 mt-2">Curating our finest content for you...</p>
      </motion.div>
    </div>
  )
}
