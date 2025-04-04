"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Phone, Mail } from "lucide-react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  // Use RAF for smoother scroll handling
  useEffect(() => {
    let ticking = false
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      lastScrollY = window.scrollY

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = lastScrollY > 10
          if (isScrolled !== scrolled) {
            setScrolled(isScrolled)
          }
          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  // Update CSS variable based on scroll state
  useEffect(() => {
    if (scrolled) {
      document.documentElement.style.setProperty("--header-height", "var(--header-height-scrolled)")
    } else {
      document.documentElement.style.setProperty("--header-height", "150px")
    }
  }, [scrolled])

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 bg-white border-b border-wood-200 transition-all duration-300 ease-out ${
        scrolled ? "py-1" : "py-4"
      }`}
      style={{ position: "sticky" }}
    >
      <div className="container mx-auto">
        <div className="relative flex items-center justify-center">
          {/* SVG logo on the left - vertically centered with window logo + 20px top padding */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 pt-5 transition-transform duration-300">
            <Image
              src="/images/the-still-pond-inn.svg"
              alt="The Still Pond Inn Logo"
              width={scrolled ? 280 : 320}
              height={scrolled ? 87.5 : 100}
              className="h-auto transition-all duration-300"
            />
          </div>

          {/* Window logo in center - scales on scroll */}
          <div className="transition-all duration-300 ease-out">
            <Image
              src="/images/logo.png"
              alt="The Still Pond Inn Window Logo"
              width={scrolled ? 150 : 280}
              height={scrolled ? 60 : 112}
              className="h-auto"
              priority
            />
          </div>

          {/* Contact icons on the right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <div className="hidden md:flex items-center gap-3">
              <Link href="tel:+14107088235">
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full bg-window-50 border-window-200 hover:bg-window-100 transition-all duration-300 ${
                    scrolled ? "h-8 w-8" : "h-10 w-10"
                  }`}
                >
                  <Phone
                    className={`text-window-700 transition-all duration-300 ${scrolled ? "h-4 w-4" : "h-5 w-5"}`}
                  />
                  <span className="sr-only">Call Us</span>
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full bg-window-50 border-window-200 hover:bg-window-100 transition-all duration-300 ${
                    scrolled ? "h-8 w-8" : "h-10 w-10"
                  }`}
                >
                  <Mail className={`text-window-700 transition-all duration-300 ${scrolled ? "h-4 w-4" : "h-5 w-5"}`} />
                  <span className="sr-only">Email Us</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation - stays with bottom of window image */}
        <div className={`flex justify-center transition-all duration-300 ${scrolled ? "mt-1" : "mt-2"}`}>
          <nav className="hidden md:flex items-center">
            <Link
              href="#about"
              className={`font-bold text-window-600 px-4 py-1 hover:text-window-800 transition-all duration-300 ${
                scrolled ? "text-lg" : "text-xl"
              }`}
            >
              About
            </Link>
            <div className={`h-6 w-px bg-wood-600 mx-2 transition-all duration-300 ${scrolled ? "h-5" : "h-6"}`}></div>
            <Link
              href="#amenities"
              className={`font-bold text-window-600 px-4 py-1 hover:text-window-800 transition-all duration-300 ${
                scrolled ? "text-lg" : "text-xl"
              }`}
            >
              Amenities
            </Link>
            <div className={`h-6 w-px bg-wood-600 mx-2 transition-all duration-300 ${scrolled ? "h-5" : "h-6"}`}></div>
            <Link
              href="#contact"
              className={`font-bold text-window-600 px-4 py-1 hover:text-window-800 transition-all duration-300 ${
                scrolled ? "text-lg" : "text-xl"
              }`}
            >
              Contact
            </Link>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="lg" className="text-wood-800">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

