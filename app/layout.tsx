import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import VacationRentalStructuredData from "./structured-data"
import VideoStructuredData from "./video-structured-data"
import { metadata as siteMetadata } from "./metadata"

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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
