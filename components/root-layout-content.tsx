"use client"

import type React from "react"

import { useLanguage } from "@/contexts/language-context"
import StandardLoading from "@/components/standard-loading"

interface RootLayoutContentProps {
  children: React.ReactNode
}

export default function RootLayoutContent({ children }: RootLayoutContentProps) {
  const { loading } = useLanguage()

  return (
    <>
      {loading && <StandardLoading />}
      {children}
    </>
  )
}
