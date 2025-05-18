"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"

export default function LodgifySearchBar() {
  const searchBarRef = useRef<HTMLDivElement>(null)
  const [scriptReady, setScriptReady] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const initializationAttempts = useRef(0)
  const maxAttempts = 20

  // Function to check if the Lodgify object exists and is ready
  const isLodgifyReady = () => {
    return (
      typeof window !== "undefined" &&
      window.LodgifySearchBar !== undefined &&
      typeof window.LodgifySearchBar.init === "function"
    )
  }

  // Function to initialize the search bar
  const initializeSearchBar = () => {
    // Check if we've already successfully initialized
    if (initialized) return true

    // Check if the element exists
    if (!searchBarRef.current) {
      console.log("Search bar element not found in DOM")
      return false
    }

    // Check if Lodgify is ready
    if (!isLodgifyReady()) {
      console.log("Lodgify search bar script not loaded yet")
      return false
    }

    try {
      // Initialize the search bar
      window.LodgifySearchBar.init()
      console.log("Lodgify search bar successfully initialized")
      setInitialized(true)
      return true
    } catch (error) {
      console.error("Error initializing Lodgify search bar:", error)
      return false
    }
  }

  // Effect to handle script loading and initialization
  useEffect(() => {
    if (!scriptReady) return

    // Function to attempt initialization with increasing delays
    const attemptInitialization = () => {
      if (initializationAttempts.current >= maxAttempts) {
        console.error(`Failed to initialize Lodgify search bar after ${maxAttempts} attempts`)
        return
      }

      if (initializeSearchBar()) {
        // Success - no need for further attempts
        return
      }

      // Schedule next attempt with increasing delay
      initializationAttempts.current += 1
      const delay = Math.min(500 * Math.pow(1.2, initializationAttempts.current), 10000)

      console.log(`Scheduling attempt ${initializationAttempts.current} in ${delay}ms`)
      setTimeout(attemptInitialization, delay)
    }

    // Start the initialization process
    attemptInitialization()

    // Set up event listeners for page visibility and focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !initialized) {
        attemptInitialization()
      }
    }

    const handleFocus = () => {
      if (!initialized) {
        attemptInitialization()
      }
    }

    window.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("focus", handleFocus)

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("focus", handleFocus)
    }
  }, [scriptReady, initialized])

  // Handle direct script injection as a fallback
  useEffect(() => {
    // If the script hasn't loaded after 5 seconds, try direct injection
    const timeout = setTimeout(() => {
      if (!scriptReady && !isLodgifyReady()) {
        console.log("Attempting direct script injection for Lodgify")

        const script = document.createElement("script")
        script.src = "https://app.lodgify.com/portable-search-bar/stable/renderPortableSearchBar.js"
        script.async = true
        script.onload = () => {
          console.log("Lodgify script loaded via direct injection")
          setScriptReady(true)
        }
        document.body.appendChild(script)
      }
    }, 5000)

    return () => clearTimeout(timeout)
  }, [scriptReady])

  return (
    <>
      <style jsx global>{`
        :root {
          --ldg-psb-background: #ffffff;
          --ldg-psb-border-radius: 0.42em;
          --ldg-psb-box-shadow: 0px 24px 54px 0px rgba(0, 0, 0, 0.1);
          --ldg-psb-padding: 14px;
          --ldg-psb-input-background: #ffffff;
          --ldg-psb-button-border-radius: 3.58em;
          --ldg-psb-color-primary: #286d9e;
          --ldg-psb-color-primary-lighter: #94b6cf;
          --ldg-psb-color-primary-darker: #14374f;
          --ldg-psb-color-primary-contrast: #ffffff;
          --ldg-semantic-color-primary: #286d9e;
          --ldg-semantic-color-primary-lighter: #94b6cf;
          --ldg-semantic-color-primary-darker: #14374f;
          --ldg-semantic-color-primary-contrast: #ffffff;
          --ldg-component-modal-z-index: 999;
        }
        #lodgify-search-bar {
          position: relative;
          z-index: 999;
          width: 100%;
        }
        
        /* Force horizontal layout on screens above md breakpoint (768px) */
        @media (min-width: 768px) {
          #lodgify-search-bar [data-testid="portable-search-bar-container"] {
            flex-direction: row !important;
            align-items: center !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          
          #lodgify-search-bar [data-testid="portable-search-bar-container"] > div {
            flex: 1 !important;
            margin: 0 !important;
          }
          
          #lodgify-search-bar [data-testid="portable-search-bar-container"] button {
            margin-top: 0 !important;
            height: 100% !important;
            min-width: 120px !important;
          }
        }
      `}</style>

      <div
        ref={searchBarRef}
        id="lodgify-search-bar"
        data-website-id="582359"
        data-language-code="en"
        data-search-page-url="https://still-pond-inn.lodgify.com/en/all-properties"
        data-dates-check-in-label="Check-in"
        data-dates-check-out-label="Check-out"
        data-guests-counter-label="Guests"
        data-guests-input-singular-label="{{NumberOfGuests}} guest"
        data-guests-input-plural-label="{{NumberOfGuests}} guests"
        data-location-input-label="Location"
        data-search-button-label="Search"
        data-dates-input-min-stay-tooltip-text='{"one":"Minimum {minStay} night","other":"Minimum {minStay} nights"}'
        data-guests-breakdown-label="Guests"
        data-adults-label='{"one":"adult","other":"adults"}'
        data-adults-description="Ages {minAge} or above"
        data-children-label='{"one":"child","other":"children"}'
        data-children-description="Ages {minAge}-{maxAge}"
        data-children-not-allowed-label="Not suitable for children"
        data-infants-label='{"one":"infant","other":"infants"}'
        data-infants-description="Under {maxAge}"
        data-infants-not-allowed-label="Not suitable for infants"
        data-pets-label='{"one":"pet","other":"pets"}'
        data-pets-not-allowed-label="Not allowed"
        data-done-label="Done"
        data-new-tab="true"
        data-version="stable"
        data-has-guests-breakdown
      ></div>

      {/* Fallback UI that shows if initialization fails */}
      {!initialized && initializationAttempts.current > maxAttempts / 2 && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <p className="text-center text-window-700">
            Having trouble with our booking system?{" "}
            <a
              href="https://still-pond-inn.lodgify.com/en/all-properties"
              target="_blank"
              rel="noopener noreferrer"
              className="text-window-600 hover:underline font-medium"
            >
              Click here to search for availability
            </a>
          </p>
        </div>
      )}

      {/* Use both onLoad and strategy="beforeInteractive" for more reliable loading */}
      <Script
        id="lodgify-search-bar-script"
        src="https://app.lodgify.com/portable-search-bar/stable/renderPortableSearchBar.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log("Lodgify script loaded via Next.js Script")
          setScriptReady(true)
        }}
        onError={() => {
          console.error("Failed to load Lodgify script via Next.js Script")
        }}
      />
    </>
  )
}
