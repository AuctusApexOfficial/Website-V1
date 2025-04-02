"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LanguageSwitcher from "./language-switcher"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()
  const [showPhoneInput, setShowPhoneInput] = useState(false)
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate successful subscription
    setSubscriptionSuccess(true)
  }

  return (
    <footer className="bg-stone-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-2xl font-bold">
              <span className="text-amber-300">Auctus</span> Apex
            </h3>
            <p className="mt-4 text-gray-400">
              Elevating brands through sophisticated marketing strategies and bespoke web design solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold">{t("footer.quickLinks")}</h4>
            <ul className="mt-4 space-y-2">
              {["Services", "About Us", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={
                      item === "Services"
                        ? "/services"
                        : item === "About Us"
                          ? "/about"
                          : item === "Contact"
                            ? "/contact"
                            : "#"
                    }
                    className="text-gray-400 transition-colors hover:text-amber-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold">{t("footer.contactUs")}</h4>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 flex-shrink-0 text-amber-300" />
                <span className="text-gray-400">
                  30 N Gould St # 35974
                  <br />
                  Sheridan, WY 82801
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 flex-shrink-0 text-amber-300" />
                <a href="tel:+14845369423" className="text-gray-400 hover:text-amber-300 transition-colors">
                  +1 (484) 536-9423
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 flex-shrink-0 text-amber-300" />
                <a href="mailto:info@auctusapex.com" className="text-gray-400 hover:text-amber-300 transition-colors">
                  info@auctusapex.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold">{t("footer.subscribe")}</h4>
            <p className="mt-4 text-gray-400">{t("footer.stayUpdated")}</p>

            {subscriptionSuccess ? (
              <div className="mt-6 overflow-hidden rounded-md border border-amber-300/30 bg-gradient-to-b from-amber-900/20 to-stone-900/40 p-6 shadow-lg">
                <div className="relative">
                  {/* Gold decorative element */}
                  <div className="absolute -left-1 top-0 h-full w-1 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-300"></div>

                  <div className="pl-4">
                    <div className="mb-1 flex items-center">
                      <svg
                        className="mr-2 h-5 w-5 text-amber-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <h5 className="font-serif text-lg font-medium text-amber-300">Subscription Confirmed</h5>
                    </div>

                    <p className="mb-3 text-gray-300 text-sm">Thank you for subscribing to our exclusive newsletter.</p>

                    <p className="text-xs text-gray-400 italic">
                      You&apos;ll receive curated updates about our premium services and special offerings.
                    </p>
                  </div>
                </div>

                {/* Bottom decorative element */}
                <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 space-y-3">
                <div className="flex">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required
                    className="rounded-r-none border-gray-700 bg-gray-800 text-white focus:border-amber-300 focus:ring-amber-300"
                    onFocus={() => setShowPhoneInput(true)}
                  />
                  <Button type="submit" className="rounded-l-none bg-amber-700 hover:bg-amber-800">
                    {t("footer.subscribeButton")}
                  </Button>
                </div>

                {showPhoneInput && (
                  <div className="transition-all duration-300">
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone number (optional for SMS updates)"
                      className="w-full border-gray-700 bg-gray-800 text-white focus:border-amber-300 focus:ring-amber-300"
                    />
                    <p className="mt-1 text-xs text-gray-500">We&apos;ll send newsletter updates via SMS if provided</p>
                  </div>
                )}
              </form>
            )}

            <p className="mt-4 font-serif text-xs italic text-gray-500">
              &quot;{t("footer.latin")}&quot; — {t("footer.latinTranslation")}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <div className="flex items-center justify-center mb-4">
            <LanguageSwitcher position="footer" />
          </div>
          <p>
            &copy; {new Date().getFullYear()} Auctus Apex. Est. MMXXV. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}

