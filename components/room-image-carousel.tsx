"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface RoomImage {
  src: string
  alt: string
  room: string
}

export default function RoomImageCarousel() {
  const [images, setImages] = useState<RoomImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<NodeJS.Timeout>()

  // Fetch images once on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true)

        // Make a single API call to get all room images
        const response = await fetch("/api/room-images")

        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.status}`)
        }

        const data = await response.json()

        if (!data.rooms || !Array.isArray(data.rooms)) {
          throw new Error("Invalid response format")
        }

        // Process and combine images from all rooms
        const allImages: RoomImage[] = []

        data.rooms.forEach((room: any) => {
          const roomName = room.name
          const roomImages = room.images.map((img: any) => ({
            src: img.src,
            alt: img.alt || roomName,
            room: roomName,
          }))
          allImages.push(...roomImages)
        })

        // Remove duplicate images based on the image URL
        const uniqueImages = allImages.filter(
          (image, index, self) => index === self.findIndex((t) => t.src === image.src),
        )

        setImages(uniqueImages)
      } catch (error) {
        console.error("Error fetching room images:", error)
        // Set fallback images
        setImages([
          {
            src: "https://sjc.microlink.io/kHduuS2ZaxqtvSUGTOXsjCUP55mORlCOfXGlFVFNPuHNbcUnKmEFEmWpA75QITNaigZ2T3s3oWHkdd-kD6sFRA.jpeg",
            alt: "The Echo Suite - Bedroom",
            room: "The Echo Suite",
          },
          {
            src: "https://l.icdbcdn.com/oh/b6c6f5d9-a164-4a44-98b4-e135e56ec654.jpg?f=32",
            alt: "Ziggy's Room - Main View",
            room: "Ziggy's Room",
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  // Handle autoplay
  useEffect(() => {
    if (autoplay && images.length > 0) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 5000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, images.length])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (isLoading) {
    return (
      <div className="w-full h-96 bg-window-50 flex items-center justify-center">
        <div className="animate-pulse text-window-600">Loading room images...</div>
      </div>
    )
  }

  if (images.length === 0) {
    return null // Don't show the carousel if no images
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={carouselRef}
    >
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              unoptimized={image.src.includes("icdbcdn.com") || image.src.includes("blob.v0.dev")}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="container mx-auto">
                <p className="text-white text-lg md:text-xl font-medium">{image.room}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10 z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous image</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10 z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next image</span>
      </Button>

      {/* Indicator dots */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-1 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            onClick={() => goToSlide(index)}
          >
            <span className="sr-only">Image {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
