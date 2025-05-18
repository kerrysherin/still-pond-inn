"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useLodgifyData } from "@/hooks/use-lodgify-data"

// Define the shape of our room data
export interface RoomData {
  title: string
  description: string
  images: { src: string; alt: string }[]
  price: number
  beds: { type: string; count: number }[]
  bathrooms: number
  maxGuests: number
  amenities: string[]
  rentalId?: string
  contactLink?: string
}

interface RoomDataContextType {
  rooms: RoomData[]
  isLoading: boolean
  error: string | null
}

const RoomDataContext = createContext<RoomDataContextType>({
  rooms: [],
  isLoading: false,
  error: null,
})

export const useRoomData = () => useContext(RoomDataContext)

interface RoomDataProviderProps {
  children: ReactNode
  initialRooms?: RoomData[]
}

export function RoomDataProvider({ children, initialRooms = [] }: RoomDataProviderProps) {
  // Fetch Ziggy's Room data
  const { data: ziggyData, isLoading: ziggyLoading, error: ziggyError } = useLodgifyData({ propertyId: "673142" })

  // Fetch Echo Suite data
  const { data: echoData, isLoading: echoLoading, error: echoError } = useLodgifyData({ propertyId: "673171" })

  // Process and combine the data
  const rooms = [...initialRooms]
  const isLoading = ziggyLoading || echoLoading
  const error = ziggyError || echoError

  // Update Ziggy's Room if data is available
  if (ziggyData && ziggyData.length > 0) {
    const ziggyRoom = ziggyData[0]
    const ziggyIndex = rooms.findIndex((room) => room.title === "Ziggy's Room")

    if (ziggyIndex >= 0) {
      // Update existing room data
      rooms[ziggyIndex] = {
        ...rooms[ziggyIndex],
        description: ziggyRoom.description.split("\n")[0], // First paragraph only
        images: ziggyRoom.images.slice(0, 5).map((img) => ({
          src: `https:${img.url}`,
          alt: img.text || "Ziggy's Room",
        })),
        price: Math.round(ziggyRoom.min_price),
        maxGuests: ziggyRoom.max_people,
        bathrooms: ziggyRoom.bathrooms,
      }
    }
  }

  // Update Echo Suite if data is available
  if (echoData && echoData.length > 0) {
    const echoRoom = echoData[0]
    const echoIndex = rooms.findIndex((room) => room.title === "The Echo Suite")

    if (echoIndex >= 0) {
      // Update existing room data
      rooms[echoIndex] = {
        ...rooms[echoIndex],
        description: echoRoom.description.split("\n")[0], // First paragraph only
        images: echoRoom.images.slice(0, 5).map((img) => ({
          src: `https:${img.url}`,
          alt: img.text || "The Echo Suite",
        })),
        price: Math.round(echoRoom.min_price),
        maxGuests: echoRoom.max_people,
        bathrooms: echoRoom.bathrooms,
      }
    }
  }

  return <RoomDataContext.Provider value={{ rooms, isLoading, error }}>{children}</RoomDataContext.Provider>
}

export { RoomDataContext }
