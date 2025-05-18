import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import VacationRentalStructuredData from "./structured-data"
import VideoStructuredData from "./video-structured-data"
import { metadata as siteMetadata } from "./metadata"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = siteMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <VacationRentalStructuredData />
        <VideoStructuredData />
        {/* Preload the Lodgify script */}
        <link
          rel="preload"
          href="https://app.lodgify.com/portable-search-bar/stable/renderPortableSearchBar.js"
          as="script"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        {children}

        {/* Add the Lodgify script directly in the body for maximum reliability */}
        <Script
          id="lodgify-direct-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Load Lodgify script directly
              (function() {
                if (typeof window.LodgifySearchBar === 'undefined') {
                  console.log('Loading Lodgify script directly');
                  var script = document.createElement('script');
                  script.src = 'https://app.lodgify.com/portable-search-bar/stable/renderPortableSearchBar.js';
                  script.async = true;
                  script.onload = function() {
                    console.log('Lodgify script loaded directly');
                    if (typeof window.LodgifySearchBar !== 'undefined' && typeof window.LodgifySearchBar.init === 'function') {
                      setTimeout(function() {
                        console.log('Initializing Lodgify search bar directly');
                        window.LodgifySearchBar.init();
                      }, 500);
                    }
                  };
                  document.body.appendChild(script);
                }
              })();
            `,
          }}
        />

        {/* Add a global script to help with Lodgify initialization */}
        <Script id="lodgify-init-helper" strategy="afterInteractive">
          {`
            // Helper function to initialize Lodgify widgets when they're available
            function initLodgifyWidgets() {
              if (typeof window.LodgifySearchBar !== 'undefined' && typeof window.LodgifySearchBar.init === 'function') {
                console.log('Global helper: Initializing Lodgify search bar');
                window.LodgifySearchBar.init();
              }
              
              if (typeof window.LodgifyBookNowBox !== 'undefined' && typeof window.LodgifyBookNowBox.init === 'function') {
                console.log('Global helper: Initializing Lodgify book now box');
                window.LodgifyBookNowBox.init();
              }
            }
            
            // Try to initialize on page load
            window.addEventListener('load', function() {
              setTimeout(initLodgifyWidgets, 1000);
            });
            
            // Try to initialize when coming back to the page
            window.addEventListener('focus', function() {
              setTimeout(initLodgifyWidgets, 500);
            });
            
            // Try to initialize when hash changes (for single page navigation)
            window.addEventListener('hashchange', function() {
              setTimeout(initLodgifyWidgets, 500);
            });
          `}
        </Script>
      </body>
    </html>
  )
}
