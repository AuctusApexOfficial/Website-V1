"use client"

import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

type Language = "en" | "it" | "es"

interface LanguageSwitcherProps {
  position?: "header" | "footer"
  onLanguageChange?: (language: Language) => void
}

export default function LanguageSwitcher({ position = "footer", onLanguageChange }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()

  const handleLanguageChange = (newLanguage: Language) => {
    // Update the language in the context
    setLanguage(newLanguage)

    // Store the language in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("language", newLanguage)
    }

    // If an onLanguageChange callback was provided, call it
    if (onLanguageChange) {
      onLanguageChange(newLanguage)
    }
  }

  const isActive = (lang: Language) => language === lang

  const languageNames = {
    en: "English",
    it: "Italiano",
    es: "Español",
  }

  return (
    <div className={`inline-flex items-center ${position === "header" ? "border-b border-transparent" : ""}`}>
      <Globe className={`h-4 w-4 mr-2 opacity-70 ${position === "header" ? "text-current" : "text-amber-300"}`} />
      <div className="font-serif space-x-3">
        {(["en", "it", "es"] as Language[]).map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`hover:text-amber-300 transition-colors focus:outline-none ${
              isActive(lang) ? "text-gray-300" : "text-gray-500"
            }`}
            aria-label={`Switch to ${languageNames[lang]}`}
          >
            {languageNames[lang]}
          </button>
        ))}
      </div>
    </div>
  )
}

