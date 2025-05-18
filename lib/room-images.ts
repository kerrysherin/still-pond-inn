// This file provides access to the room images data

// Import the JSON data correctly
import roomImagesData from "../data/room-images.json"

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
  try {
    // Access the rooms property directly from the imported JSON
    return roomImagesData.rooms as RoomData[]
  } catch (error) {
    console.error("Error accessing room images data:", error)
    return []
  }
}

// Function to get images for a specific room
export function getRoomImages(roomId: string): RoomImage[] {
  try {
    const allRooms = getAllRoomImages()
    const room = allRooms.find((r) => r.id === roomId)

    if (room && room.images && room.images.length > 0) {
      return room.images
    }

    // Return empty array if room not found
    return []
  } catch (error) {
    console.error(`Error getting images for room ${roomId}:`, error)
    return []
  }
}

// Function to get room name by ID
export function getRoomName(roomId: string): string {
  try {
    const allRooms = getAllRoomImages()
    const room = allRooms.find((r) => r.id === roomId)

    if (room) {
      return room.name
    }

    return roomId === "673142" ? "Ziggy's Room" : roomId === "673171" ? "The Echo Suite" : "Room"
  } catch (error) {
    console.error(`Error getting name for room ${roomId}:`, error)
    return "Room"
  }
}
