"use client"

import { useState, useEffect } from "react"

interface VideoWithFallbackProps {
  videoSrc: string
  posterSrc: string
  fallbackSrc?: string
  alt: string
}

export default function VideoWithFallback({ videoSrc, posterSrc, fallbackSrc, alt }: VideoWithFallbackProps) {
  const [videoFailed, setVideoFailed] = useState(false)
  const [posterFailed, setPosterFailed] = useState(false)

  // Use the fallback image if provided, otherwise use the poster
  const actualFallbackSrc = fallbackSrc || posterSrc

  // Check if the video file exists
  useEffect(() => {
    const checkVideo = async () => {
      try {
        const response = await fetch(videoSrc, { method: "HEAD" })
        if (!response.ok) {
          console.warn(`Video file not found: ${videoSrc}`)
          setVideoFailed(true)
        }
      } catch (error) {
        console.error("Error checking video file:", error)
        setVideoFailed(true)
      }
    }

    // Check if the poster file exists
    const checkPoster = async () => {
      try {
        const response = await fetch(posterSrc, { method: "HEAD" })
        if (!response.ok) {
          console.warn(`Poster file not found: ${posterSrc}`)
          setPosterFailed(true)
        }
      } catch (error) {
        console.error("Error checking poster file:", error)
        setPosterFailed(true)
      }
    }

    checkVideo()
    checkPoster()
  }, [videoSrc, posterSrc])

  return (
    <div className="h-full w-full relative">
      {/* Fallback image */}
      <img
        src={posterFailed ? actualFallbackSrc : posterSrc}
        alt={alt}
        className="h-full w-full object-cover absolute inset-0"
        onError={() => setPosterFailed(true)}
      />

      {/* Video element - only shown if video hasn't failed */}
      {!videoFailed && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover absolute inset-0 z-10"
          onError={() => setVideoFailed(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
