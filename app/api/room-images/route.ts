import { NextResponse } from "next/server"
import { getAllRoomImages, getZiggyImages, getEchoImages } from "@/lib/lodgify-images"

// Cache for 24 hours
export const revalidate = 86400

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const roomId = searchParams.get("roomId")

  try {
    // If roomId is provided, return images for that specific room
    if (roomId) {
      if (roomId === "673142") {
        const images = await getZiggyImages()
        return NextResponse.json({ images })
      } else if (roomId === "673171") {
        const images = await getEchoImages()
        return NextResponse.json({ images })
      } else {
        return NextResponse.json({ error: "Invalid room ID" }, { status: 400 })
      }
    }

    // Otherwise return all room images
    const allRooms = await getAllRoomImages()
    return NextResponse.json({ rooms: allRooms })
  } catch (error) {
    console.error("Error fetching room images:", error)
    return NextResponse.json({ error: "Failed to fetch room images" }, { status: 500 })
  }
}
