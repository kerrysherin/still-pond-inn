"use client"

import { useState } from "react"

export default function HeroVideo() {
  const [videoFailed, setVideoFailed] = useState(false)

  return (
    <div className="h-full w-full relative">
      {/* Fallback image that will show if video fails */}
      <img
        src="/videos/chesapeake-thumbnail.png"
        alt="Chesapeake Bay"
        className="h-full w-full object-cover absolute inset-0"
      />

      {/* Video that will play on top of the image if it loads */}
      {!videoFailed && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover absolute inset-0 z-10"
          onError={() => setVideoFailed(true)}
        >
          <source src="/videos/chesapeake.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  )
}
