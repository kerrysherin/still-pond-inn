"use client"
import { useEffect, useRef } from "react"
import Script from "next/script"

interface LodgifyBookNowBoxProps {
  rentalId: string
}

export default function LodgifyBookNowBox({ rentalId }: LodgifyBookNowBoxProps) {
  const initialized = useRef(false)
  const bookNowBoxRef = useRef<HTMLDivElement>(null)

  // This function will reinitialize the book now box when needed
  const initializeBookNowBox = () => {
    if (typeof window !== "undefined" && window.LodgifyBookNowBox && bookNowBoxRef.current) {
      try {
        window.LodgifyBookNowBox.init()
        console.log("Lodgify book now box reinitialized")
      } catch (error) {
        console.error("Error reinitializing Lodgify book now box:", error)
      }
    }
  }

  // Initialize book now box when component mounts and when navigating back to the page
  useEffect(() => {
    // Only run once
    if (!initialized.current) {
      initialized.current = true

      // Add event listener for when user navigates back to the page
      window.addEventListener("focus", initializeBookNowBox)
    }

    return () => {
      // Clean up event listeners
      window.removeEventListener("focus", initializeBookNowBox)
    }
  }, [])

  // Handle script load event
  const handleScriptLoad = () => {
    // Short delay to ensure the script is fully initialized
    setTimeout(initializeBookNowBox, 100)
  }

  return (
    <>
      <style jsx global>{`
        :root {
          --ldg-bnb-background: #ffffff;
          --ldg-bnb-border-radius: 0.42em;
          --ldg-bnb-box-shadow: 0px 24px 54px 0px rgba(0, 0, 0, 0.1);
          --ldg-bnb-padding: 14px;
          --ldg-bnb-input-background: #ffffff;
          --ldg-bnb-button-border-radius: 3.58em;

          --ldg-bnb-color-primary: #286d9e;
          --ldg-bnb-color-primary-lighter: #94b6cf;
          --ldg-bnb-color-primary-darker: #14374f;
          --ldg-bnb-color-primary-contrast: #ffffff;
          --ldg-component-calendar-cell-selection-bg-color: #286d9e;
          --ldg-component-calendar-cell-selection-color: #ffffff;
          --ldg-component-calendar-cell-selected-bg-color: #94b6cf;
          --ldg-component-calendar-cell-selected-color: #ffffff;
          --ldg-bnb-font-family: inherit;
          --ldg-component-modal-z-index: 999;
        }
        
        #lodgify-book-now-box {    
          width: 100%;
        }
        
        /* Target the main container that has the gray border */
        #lodgify-book-now-box > div,
        #lodgify-book-now-box > div > div,
        #lodgify-book-now-box [data-testid="book-now-box-container"],
        #lodgify-book-now-box [data-testid="book-now-box-container"] > div {
          padding: 0 !important;
          margin: 0 !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          border: none !important;
          outline: none !important;
          z-index: 50 !important;
        }
      `}</style>
      <div
        ref={bookNowBoxRef}
        id="lodgify-book-now-box"
        data-rental-id={rentalId}
        data-website-id="582359"
        data-slug="still-pond-inn"
        data-language-code="en"
        data-new-tab="true"
        data-version="stable"
        data-has-guests-breakdown
        data-check-in-label="Check-in"
        data-check-out-label="Check-out"
        data-guests-label="Guests"
        data-guests-singular-label="{{NumberOfGuests}} guest"
        data-guests-plural-label="{{NumberOfGuests}} guests"
        data-location-input-label="Location"
        data-total-price-label="Total price:"
        data-select-dates-to-see-price-label="Select dates to see total price"
        data-minimum-price-per-night-first-label="From"
        data-minimum-price-per-night-second-label="per night"
        data-book-button-label="Book Now"
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
      ></div>

      <Script
        src="https://app.lodgify.com/book-now-box/stable/renderBookNowBox.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
    </>
  )
}
