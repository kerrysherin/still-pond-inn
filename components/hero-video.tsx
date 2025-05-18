"use client"

import { useState } from "react"

export default function HeroVideo() {
  const [videoFailed, setVideoFailed] = useState(false)

  return (
    <div className="h-full w-full relative">
      {/* If video fails, show a colored background */}
      {videoFailed && <div className="absolute inset-0 bg-window-600" aria-hidden="true"></div>}

      {/* Just the video without a poster/thumbnail */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover absolute inset-0"
        onError={() => setVideoFailed(true)}
      >
        <source src="/videos/chesapeake.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
