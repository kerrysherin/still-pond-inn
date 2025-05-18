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
      video.play().catch((error) => {
        console.error("Error attempting to play video:", error)
      })
    }

    video.addEventListener("ended", handleEnded)

    // Ensure video plays on load
    video.play().catch((error) => {
      console.error("Error attempting to play video:", error)
    })

    return () => {
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  return (
    <video ref={videoRef} autoPlay muted loop={true} playsInline poster={poster} className="h-full w-full object-cover">
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default VideoPlayer
