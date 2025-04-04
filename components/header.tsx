"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Phone, Mail, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile(768) // Check if screen is mobile (< 768px)
  const isTablet = useMobile(1024) && !isMobile // Between 768px and 1024px

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
      document.documentElement.style.setProperty("--header-height", isMobile ? "60px" : "150px")
    }
  }, [scrolled, isMobile])

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }, [isMobile, mobileMenuOpen])

  // Calculate SVG logo size based on screen size and scroll state
  const getSvgLogoSize = () => {
    if (isMobile) {
      return {
        width: scrolled ? 240 : 280,
        height: scrolled ? 75 : 87.5,
      }
    }
    if (isTablet) {
      return {
        width: scrolled ? 220 : 250,
        height: scrolled ? 68.75 : 78.125,
      }
    }
    return {
      width: scrolled ? 280 : 320,
      height: scrolled ? 87.5 : 100,
    }
  }

  const svgLogoSize = getSvgLogoSize()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 bg-white border-b border-wood-200 transition-all duration-300 ease-out ${
        scrolled ? "py-1" : isMobile ? "py-0" : "py-4"
      }`}
      style={{ position: "sticky" }}
    >
      <div className="container mx-auto">
        {/* Mobile layout - stacked logos */}
        {isMobile ? (
          <div className="flex flex-col items-center">
            {/* Window logo on top */}
            <div className="flex flex-col items-center">
              <Image
                src="/images/logo.png"
                alt="The Still Pond Inn Window Logo"
                width={scrolled ? 160 : 220}
                height={scrolled ? 64 : 88}
                className="h-auto"
                priority
              />

              {/* SVG logo with even more aggressive negative margin */}
              <div className="mt-[-45px]">
                <Image
                  src="/images/the-still-pond-inn.svg"
                  alt="The Still Pond Inn Logo"
                  width={svgLogoSize.width}
                  height={svgLogoSize.height}
                  className="h-auto"
                />
              </div>

              {/* MUCH LARGER hamburger menu with aggressive negative margin */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="text-wood-800 transition-all duration-300 p-1 h-14 w-14 mt-[-35px]"
              >
                {mobileMenuOpen ? <X className="h-9 w-9" /> : <Menu className="h-9 w-9" />}
                <span className="sr-only">{mobileMenuOpen ? "Close Menu" : "Open Menu"}</span>
              </Button>
            </div>
          </div>
        ) : (
          // Desktop/Tablet layout - side by side
          <div className="relative flex items-center justify-center">
            {/* SVG logo on the left */}
            <div
              className={`absolute left-0 top-1/2 -translate-y-1/2 transition-transform duration-300 ${
                isTablet ? "pt-3" : "pt-5"
              }`}
            >
              <Image
                src="/images/the-still-pond-inn.svg"
                alt="The Still Pond Inn Logo"
                width={svgLogoSize.width}
                height={svgLogoSize.height}
                className="h-auto transition-all duration-300"
              />
            </div>

            {/* Window logo in center */}
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
              <div className="flex items-center gap-3">
                <Link href="tel:+14107081525">
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
                    <Mail
                      className={`text-window-700 transition-all duration-300 ${scrolled ? "h-4 w-4" : "h-5 w-5"}`}
                    />
                    <span className="sr-only">Email Us</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Desktop/Tablet Navigation */}
        {!isMobile && (
          <div className={`flex justify-center transition-all duration-300 ${scrolled ? "mt-1" : "mt-2"}`}>
            <nav className="flex items-center">
              <Link
                href="#about"
                className={`font-bold text-window-600 px-4 py-1 hover:text-window-800 transition-all duration-300 ${
                  scrolled ? "text-lg" : "text-xl"
                }`}
              >
                About
              </Link>
              <div
                className={`h-6 w-px bg-wood-600 mx-2 transition-all duration-300 ${scrolled ? "h-5" : "h-6"}`}
              ></div>
              <Link
                href="#amenities"
                className={`font-bold text-window-600 px-4 py-1 hover:text-window-800 transition-all duration-300 ${
                  scrolled ? "text-lg" : "text-xl"
                }`}
              >
                Amenities
              </Link>
              <div
                className={`h-6 w-px bg-wood-600 mx-2 transition-all duration-300 ${scrolled ? "h-5" : "h-6"}`}
              ></div>
              <Link
                href="#contact"
                className={`font-bold text-window-600 px-4 py-1 hover:text-window-800 transition-all duration-300 ${
                  scrolled ? "text-lg" : "text-xl"
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}

        {/* Mobile Navigation Menu - Tightened spacing */}
        {isMobile && mobileMenuOpen && (
          <div className="mt-0 pb-1 border-t border-wood-200 animate-in fade-in slide-in-from-top duration-300">
            <nav className="flex flex-col items-center pt-1">
              <Link
                href="#about"
                className="font-bold text-lg text-window-600 py-1 hover:text-window-800 w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#amenities"
                className="font-bold text-lg text-window-600 py-1 hover:text-window-800 w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Amenities
              </Link>
              <Link
                href="#contact"
                className="font-bold text-lg text-window-600 py-1 hover:text-window-800 w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile contact options */}
              <div className="flex gap-4 mt-0 py-1">
                <Link href="tel:+14107081525">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-window-50 border-window-200 hover:bg-window-100"
                  >
                    <Phone className="h-4 w-4 text-window-700" />
                    <span className="sr-only">Call Us</span>
                  </Button>
                </Link>
                <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-window-50 border-window-200 hover:bg-window-100"
                  >
                    <Mail className="h-4 w-4 text-window-700" />
                    <span className="sr-only">Email Us</span>
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

