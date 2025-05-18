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

// Function to get all room data
export function getAllRoomImages(): RoomData[] {
  return roomImagesData.rooms as RoomData[]
}

// Function to get images for a specific room
export function getRoomImages(roomId: string): RoomImage[] {
  const allRooms = getAllRoomImages()
  const room = allRooms.find((r) => r.id === roomId)

  if (room && room.images && room.images.length > 0) {
    return room.images
  }

  // Return empty array if room not found
  return []
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
