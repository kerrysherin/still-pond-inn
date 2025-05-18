// This file provides access to the room images data

import roomImagesData from "@/data/room-images.json"

// Define types for our image data
export interface RoomImage {
  src: string
  alt: string
}

export interface RoomData {
  id: string
  name: string
  images: RoomImage[]
}

// Fallback images in case JSON file is missing or empty
const fallbackRoomData: RoomData[] = [
  {
    id: "673142",
    name: "Ziggy's Room",
    images: [
      {
        src: "https://l.icdbcdn.com/oh/b6c6f5d9-a164-4a44-98b4-e135e56ec654.jpg?f=32",
        alt: "Ziggy's Room - Main View",
      },
    ],
  },
  {
    id: "673171",
    name: "The Echo Suite",
    images: [
      {
        src: "https://sjc.microlink.io/kHduuS2ZaxqtvSUGTOXsjCUP55mORlCOfXGlFVFNPuHNbcUnKmEFEmWpA75QITNaigZ2T3s3oWHkdd-kD6sFRA.jpeg",
        alt: "The Echo Suite - Bedroom",
      },
    ],
  },
]

// Function to get all room data
export function getAllRoomImages(): RoomData[] {
  // Use the JSON data if available, otherwise use fallback
  if (roomImagesData && roomImagesData.rooms && roomImagesData.rooms.length > 0) {
    return roomImagesData.rooms as RoomData[]
  }
  return fallbackRoomData
}

// Function to get images for a specific room
export function getRoomImages(roomId: string): RoomImage[] {
  const allRooms = getAllRoomImages()
  const room = allRooms.find((r) => r.id === roomId)

  if (room && room.images && room.images.length > 0) {
    return room.images
  }

  // Return fallback images if room not found
  const fallbackRoom = fallbackRoomData.find((r) => r.id === roomId)
  return fallbackRoom ? fallbackRoom.images : []
}

// Function to get room name by ID
export function getRoomName(roomId: string): string {
  const allRooms = getAllRoomImages()
  const room = allRooms.find((r) => r.id === roomId)

  if (room) {
    return room.name
  }

  return roomId === "673142" ? "Ziggy's Room" : roomId === "673171" ? "The Echo Suite" : "Room"
}
