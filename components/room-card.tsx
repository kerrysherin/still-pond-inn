"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Bed, Bath, Users, Coffee, Wifi, Snowflake, Tv, Utensils } from "lucide-react"
import LodgifyBookNowBox from "./lodgify-book-now-box"
import { getRoomImages } from "@/lib/room-images"

// Define amenity icons and their labels
const amenityIcons = {
  wifi: { icon: Wifi, label: "Free Wi-Fi" },
  ac: { icon: Snowflake, label: "Air Conditioning" },
  tv: { icon: Tv, label: "Smart TV" },
  coffee: { icon: Coffee, label: "Coffee Maker" },
  kitchen: { icon: Utensils, label: "Kitchenette" },
}

type RoomAmenity = keyof typeof amenityIcons

interface RoomCardProps {
  title: string
  description: string
  images: { src: string; alt: string }[]
  price: number
  beds: { type: string; count: number }[]
  bathrooms: number
  maxGuests: number
  amenities: RoomAmenity[]
  rentalId?: string
}

export default function RoomCard({
  title,
  description,
  images: initialImages,
  price,
  beds,
  bathrooms,
  maxGuests,
  amenities,
  rentalId,
}: RoomCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [images, setImages] = useState(initialImages)
  const isZiggysRoom = title === "Ziggy's Room"
  const isEchoSuite = title === "The Echo Suite"
  const isTurtleCove = title === "Turtle Cove"

  // Load images from our static JSON file if we have a rentalId
  useEffect(() => {
    if (!rentalId) return

    // Get images for this specific room from our static JSON
    const roomImages = getRoomImages(rentalId)

    if (roomImages && roomImages.length > 0) {
      setImages(roomImages)
    }
  }, [rentalId])

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <Card className="overflow-hidden border-window-200 transition-all duration-300 hover:shadow-lg hover:border-window-300 flex flex-col">
      {/* Image Carousel */}
      <div className="relative h-64 sm:h-72 md:h-80">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>
        ))}

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-8 w-8"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-8 w-8"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next image</span>
            </Button>

            {/* Image indicator dots */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <span className="sr-only">Image {index + 1}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <CardContent className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-semibold text-window-800 mb-2">{title}</h3>
        <p className="text-wood-700 mb-4">{description}</p>

        {/* Room details */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-1 text-wood-700">
            <Bed className="h-5 w-5 text-window-600" />
            <span>
              {beds.map((bed, i) => (
                <span key={i}>
                  {bed.count} {bed.type}
                  {bed.count > 1 ? "s" : ""}
                  {i < beds.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
          </div>
          <div className="flex items-center gap-1 text-wood-700">
            <Bath className="h-5 w-5 text-window-600" />
            <span>
              {bathrooms} Bathroom{bathrooms > 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-1 text-wood-700">
            <Users className="h-5 w-5 text-window-600" />
            <span>
              Up to {maxGuests} Guest{maxGuests > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Spacer to push amenities and footer to bottom */}
        <div className="flex-grow"></div>

        {/* Amenities - Fixed height container with consistent layout */}
        <div className="mt-4">
          <h4 className="text-sm font-medium text-wood-800 mb-2">Room Amenities</h4>
          <div className="grid grid-cols-5 gap-2">
            {/* Render all possible amenities, but show/hide based on availability */}
            {Object.entries(amenityIcons).map(([key, { icon: Icon, label }]) => {
              const isAvailable = amenities.includes(key as RoomAmenity)
              return (
                <div
                  key={key}
                  className={`flex items-center justify-center bg-window-50 rounded-lg p-3 ${
                    isAvailable ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  aria-hidden={!isAvailable}
                >
                  <Icon className="h-8 w-8 text-window-600" aria-label={label} role="img" />
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>

      {/* Conditional rendering for different rooms */}
      {rentalId && (isZiggysRoom || isEchoSuite) ? (
        <div className="w-full m-0 p-0 overflow-hidden border-0 border-t-0">
          <LodgifyBookNowBox rentalId={rentalId} />
        </div>
      ) : isTurtleCove ? (
        <CardFooter className="flex justify-center items-center p-6 pt-0 border-t border-window-100 mt-4">
          <div className="text-window-800 text-center pt-3">
            <span className="text-xl font-medium">Please inquire directly</span>
          </div>
        </CardFooter>
      ) : (
        <CardFooter className="flex justify-between items-center p-6 pt-0 border-t border-window-100 mt-4">
          <div className="text-window-800">
            <span className="text-2xl font-bold">${price}</span>
            <span className="text-wood-600 text-sm"> / night</span>
          </div>
          <Button className="bg-window-600 hover:bg-window-700">Book Now</Button>
        </CardFooter>
      )}
    </Card>
  )
}
