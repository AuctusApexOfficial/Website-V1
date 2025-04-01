"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import LanguageSwitcher from "./language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()
  const isBlogPage = pathname === "/blog" || pathname.startsWith("/blog/")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { key: "nav.home", href: "/" },
    { key: "nav.services", href: "/services" },
    { key: "nav.about", href: "/about" },
    { key: "nav.contact", href: "/contact" },
  ]

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white py-3 shadow-md" : "bg-transparent py-5"
      }`}
    >
      <div
        className={`fixed left-4 z-50 transition-all duration-300 ${scrolled ? "scale-90 top-2" : "scale-100 top-3"}`}
      >
        <div className="w-10 md:w-12 lg:w-14">
          <Image
            src="/auctus-logo.png"
            alt="Auctus Apex Logo"
            width={96}
            height={96}
            className="w-full drop-shadow-md"
            priority={true}
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center"
          onClick={(e) => {
            // If we're already on the home page, prevent default navigation
            // and scroll to the hero section instead
            if (window.location.pathname === "/") {
              e.preventDefault()

              // Scroll to the top of the page (hero section)
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          }}
        >
          <span
            className={`font-serif text-2xl font-bold ml-10 md:ml-12 lg:ml-14 ${
              isBlogPage ? "text-[#b88c3f]" : scrolled ? "text-gold-600" : "text-white"
            }`}
          >
            <span className={isBlogPage ? "text-[#b88c3f]" : scrolled ? "text-gold-600" : "text-gold-300"}>Auctus</span>{" "}
            Apex
          </span>
          <span className={`ml-2 font-serif text-xs italic ${scrolled ? "text-taupe-500" : "text-taupe-400"}`}>
            Est. MMXXV
          </span>
        </Link>

        <nav className="hidden absolute left-1/2 transform -translate-x-1/2 space-x-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`font-serif text-sm tracking-wide transition-colors hover:text-gold-500 ${
                isBlogPage ? "text-[#756658]" : scrolled ? "text-taupe-700" : "text-white"
              }`}
              onClick={(e) => {
                // If navigating to home page, scroll to top
                if (item.href === "/") {
                  // If we're already on the home page, prevent default navigation
                  // and scroll to the hero section instead
                  if (window.location.pathname === "/") {
                    e.preventDefault()
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }
                }
                // If navigating to a new page, scroll to top
                else if (!item.href.startsWith("#")) {
                  window.scrollTo(0, 0)
                }
              }}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-5 scale-90 origin-right z-10">
          <div className={`${scrolled ? "text-taupe-700" : "text-white"} text-sm`}>
            <LanguageSwitcher
              position="header"
              onLanguageChange={(lang) => {
                // Store the selected language in localStorage
                localStorage.setItem("language", lang)

                // Force a complete page reload to ensure all content is translated
                window.location.reload()
              }}
            />
          </div>

          <Button
            asChild
            size="sm"
            className={`${
              isBlogPage
                ? "border-[#ba8e42] text-[#ba8e42] bg-transparent hover:bg-gold-50/50"
                : scrolled
                  ? "border-gold-600 text-gold-600 bg-transparent hover:bg-gold-50/50"
                  : "border-gold-300/90 text-white bg-transparent hover:bg-gold-800/10"
            } border border-opacity-80 font-serif text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-none px-5 py-1.5 hover:shadow-sm`}
          >
            <Link href="/book" onClick={() => window.scrollTo(0, 0)}>
              {t("nav.book")}
            </Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className={`h-6 w-6 ${scrolled ? "text-taupe-900" : "text-white"}`} />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] bg-white">
            <div className="flex flex-col space-y-6 py-6">
              <Link href="/" className="flex items-center">
                <span className="font-serif text-2xl font-bold text-gold-600 ml-10">
                  <span>Auctus</span> Apex
                </span>
                <span className="ml-2 font-serif text-xs italic text-taupe-500">Est. MMXXV</span>
              </Link>

              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="font-serif text-lg tracking-wide text-taupe-700 transition-colors hover:text-gold-700"
                    onClick={(e) => {
                      // If navigating to home page, scroll to top
                      if (item.href === "/") {
                        // If we're already on the home page, prevent default navigation
                        // and scroll to the hero section instead
                        if (window.location.pathname === "/") {
                          e.preventDefault()
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          })
                        }
                      }
                      // If navigating to a new page, scroll to top
                      else if (!item.href.startsWith("#")) {
                        window.scrollTo(0, 0)
                      }
                    }}
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </nav>

              <div className="pt-2">
                <LanguageSwitcher
                  position="header"
                  onLanguageChange={(lang) => {
                    // Store the selected language in localStorage
                    localStorage.setItem("language", lang)

                    // Force a complete page reload to ensure all content is translated
                    window.location.href = window.location.pathname
                  }}
                />
              </div>

              <Button asChild className="bg-gold-600 text-white hover:bg-gold-700">
                <Link href="/book" onClick={() => window.scrollTo(0, 0)}>
                  {t("nav.book")}
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

