"use client"

import { useState, useEffect } from "react"
import type { RoomData } from "@/components/room-data-provider"

interface RoomCardImageLoaderProps {
  room: RoomData
  onImagesLoaded: (images: { src: string; alt: string }[]) => void
}

export function RoomCardImageLoader({ room, onImagesLoaded }: RoomCardImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      if (!room.rentalId) {
        // If no rental ID, use the fallback images
        return
      }

      try {
        setIsLoading(true)
        console.log(`Fetching images for ${room.title} (ID: ${room.rentalId})`)

        const response = await fetch(`/api/lodgify/images?propertyId=${room.rentalId}`)

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Failed to fetch images: ${response.status} - ${errorText}`)
        }

        let data
        try {
          data = await response.json()
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError)
          throw new Error("Invalid response format")
        }

        if (data && data.length > 0 && data[0].images && data[0].images.length > 0) {
          // Get the first 5 images or all if less than 5
          const roomImages = data[0].images.slice(0, 5).map((img: any) => ({
            src: img.src,
            alt: img.alt || room.title,
          }))

          console.log(`Loaded ${roomImages.length} images for ${room.title}`)
          onImagesLoaded(roomImages)
        } else {
          console.warn(`No images found for ${room.title}`)
        }
      } catch (error) {
        console.error(`Error loading images for ${room.title}:`, error)
        // Keep using fallback images on error
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [room, onImagesLoaded])

  // This component doesn't render anything visible
  return null
}
