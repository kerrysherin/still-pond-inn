"use client"

import Script from "next/script"

export default function LodgifySearchBar() {
  return (
    <>
      <style jsx global>{`
        :root {
          --ldg-psb-background: #ffffff;
          --ldg-psb-border-radius: 0.42em;
          --ldg-psb-box-shadow: 0px 24px 54px 0px rgba(0, 0, 0, 0.1);
          --ldg-psb-padding: 14px;
          --ldg-psb-input-background: #ffffff;
          --ldg-psb-button-border-radius: 0.42em;
          --ldg-psb-color-primary: #2d6d9e;
          --ldg-psb-color-primary-lighter: #3d8bc7;
          --ldg-psb-color-primary-darker: #265a83;
          --ldg-psb-color-primary-contrast: #ffffff;
          --ldg-semantic-color-primary: #2d6d9e;
          --ldg-semantic-color-primary-lighter: #3d8bc7;
          --ldg-semantic-color-primary-darker: #265a83;
          --ldg-semantic-color-primary-contrast: #ffffff;
          --ldg-component-modal-z-index: 900;
        }
        #lodgify-search-bar {
          position: relative;
          z-index: 900;
          width: 100%;
        }
        
        /* Force horizontal layout on screens above md breakpoint (768px) */
        @media (min-width: 768px) {
          #lodgify-search-bar [data-testid="portable-search-bar-container"] {
            flex-direction: row !important;
            align-items: center !important;
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

        /* Override button styles to match our blue */
        #lodgify-search-bar button[type="submit"],
        #lodgify-search-bar button[type="button"].primary {
          background-color: #2d6d9e !important;
          border-color: #2d6d9e !important;
        }

        #lodgify-search-bar button[type="submit"]:hover,
        #lodgify-search-bar button[type="button"].primary:hover {
          background-color: #265a83 !important;
          border-color: #265a83 !important;
        }

        /* Override any focus states */
        #lodgify-search-bar button:focus,
        #lodgify-search-bar [data-testid="portable-search-bar-container"] button:focus {
          box-shadow: 0 0 0 2px rgba(45, 109, 158, 0.25) !important;
        }
        
        /* Ensure dropdowns don't go above header */
        #lodgify-search-bar [role="dialog"],
        #lodgify-search-bar [role="presentation"] {
          z-index: 900 !important;
        }
      `}</style>

      <div
        id="lodgify-search-bar"
        data-website-id="582359"
        data-language-code="en"
        data-checkout-page-url="https://checkout.lodgify.com/still-pond-inn-unknown/en/#/673142"
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
        data-layout="horizontal"
      ></div>

      <Script
        src="https://app.lodgify.com/portable-search-bar/stable/renderPortableSearchBar.js"
        strategy="afterInteractive"
      />
    </>
  )
}
