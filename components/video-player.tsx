"use client"

import type React from "react"
import { useRef, useEffect } from "react"

interface VideoPlayerProps {
  src: string
  poster: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      video.currentTime = 0
      video.play().catch(() => {
        // Silent catch - we'll retry on user interaction
      })
    }

    video.addEventListener("ended", handleEnded)

    // Don't auto-play on load - this causes issues in production
    // Instead, add a click handler to play on user interaction
    const handleClick = () => {
      if (video.paused) {
        video.play().catch(() => {
          // Silent catch
        })
      } else {
        video.pause()
      }
    }

    video.addEventListener("click", handleClick)

    // Try to play once - this might work on desktop browsers
    video.play().catch(() => {
      // Silent catch - we'll rely on user interaction
    })

    return () => {
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      poster={poster}
      className="h-full w-full object-cover cursor-pointer"
      preload="auto"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default VideoPlayer
