"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

export default function LodgifySearchBar() {
  const searchBarRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)

  // Function to initialize the search bar
  const initializeSearchBar = () => {
    if (!searchBarRef.current) return

    if (typeof window.LodgifySearchBar !== "undefined" && typeof window.LodgifySearchBar.init === "function") {
      try {
        window.LodgifySearchBar.init()
        console.log("Lodgify search bar initialized")
      } catch (error) {
        console.error("Error initializing Lodgify search bar:", error)
      }
    }
  }

  // Effect to handle script loading
  useEffect(() => {
    // If the script is already loaded, initialize
    if (scriptLoadedRef.current) {
      // Wait a bit longer before initializing
      setTimeout(initializeSearchBar, 1000)
      return
    }

    // We'll use the Next.js Script component instead of manual script loading
    return () => {
      // Clean up if component unmounts
      scriptLoadedRef.current = false
    }
  }, [])

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

      {/* Use Next.js Script component with proper strategy and crossOrigin */}
      <Script
        src="https://app.lodgify.com/portable-search-bar/stable/renderPortableSearchBar.js"
        strategy="lazyOnload"
        crossOrigin="anonymous"
        onLoad={() => {
          scriptLoadedRef.current = true
          // Give it some time to initialize
          setTimeout(initializeSearchBar, 1000)
        }}
      />
    </>
  )
}
