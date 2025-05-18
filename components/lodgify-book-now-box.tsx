"use client"
import Script from "next/script"

interface LodgifyBookNowBoxProps {
  rentalId: string
}

export default function LodgifyBookNowBox({ rentalId }: LodgifyBookNowBoxProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --ldg-bnb-background: #ffffff;
          --ldg-bnb-border-radius: 0;
          --ldg-bnb-box-shadow: none;
          --ldg-bnb-padding: 0;
          --ldg-bnb-input-background: #ffffff;
          --ldg-bnb-button-border-radius: 3.58em;

          --ldg-bnb-color-primary: #2d6d9e;
          --ldg-bnb-color-primary-lighter: #96b6cf;
          --ldg-bnb-color-primary-darker: #17374f;
          --ldg-bnb-color-primary-contrast: #ffffff;
          --ldg-component-calendar-cell-selection-bg-color: #2d6d9e;
          --ldg-component-calendar-cell-selection-color: #ffffff;
          --ldg-component-calendar-cell-selected-bg-color: #96b6cf;
          --ldg-component-calendar-cell-selected-color: #ffffff;
          --ldg-bnb-font-family: inherit;
          --ldg-component-modal-z-index: 900;
        }
        
        #lodgify-book-now-box {    
          width: 100%;
          margin: 0;
          padding: 0;
          border: none !important;
          z-index: 50 !important;
          position: relative;
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
        
        /* Target the outer container */
        .ldg-book-now-box-container {
          border: none !important;
          box-shadow: none !important;
          border-radius: 0 !important;
          z-index: 50 !important;
        }
        
        /* Remove borders from input fields and containers */
        #lodgify-book-now-box input,
        #lodgify-book-now-box [data-testid="dates-input"],
        #lodgify-book-now-box [data-testid="guests-input"],
        #lodgify-book-now-box [data-testid="portable-search-bar-container"] > div,
        #lodgify-book-now-box [data-testid="book-now-box-container"] > div {
          border: none !important;
          box-shadow: none !important;
        }
        
        /* Remove borders from dropdown menus */
        #lodgify-book-now-box [role="dialog"],
        #lodgify-book-now-box [role="presentation"] {
          border: none !important;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1) !important;
          z-index: 900 !important;
        }
        
        /* Remove borders from calendar */
        #lodgify-book-now-box [data-testid="calendar-container"] {
          border: none !important;
        }
        
        /* Add subtle separators between inputs instead of borders */
        #lodgify-book-now-box [data-testid="dates-input"],
        #lodgify-book-now-box [data-testid="guests-input"] {
          position: relative;
        }
        
        #lodgify-book-now-box [data-testid="dates-input"]::after {
          content: "";
          position: absolute;
          right: 0;
          top: 20%;
          height: 60%;
          width: 1px;
          background-color: rgba(0, 0, 0, 0.1);
        }
        
        /* Target any remaining borders */
        #lodgify-book-now-box * {
          border-color: transparent !important;
        }
      `}</style>
      <div
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

      <Script src="https://app.lodgify.com/book-now-box/stable/renderBookNowBox.js" strategy="afterInteractive" />
    </>
  )
}
