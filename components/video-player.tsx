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

    // Ensure video plays on load with better error handling
    const playVideo = async () => {
      try {
        // Check if the video is ready to play
        if (video.readyState >= 2) {
          await video.play()
        } else {
          // If not ready, wait for the loadeddata event
          video.addEventListener(
            "loadeddata",
            () => {
              video.play().catch((error) => {
                console.error("Error playing video after load:", error)
              })
            },
            { once: true },
          )
        }
      } catch (error) {
        console.error("Error attempting to play video:", error)
      }
    }

    playVideo()

    return () => {
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop={true}
      playsInline
      poster={poster}
      className="h-full w-full object-cover"
      preload="auto"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default VideoPlayer
