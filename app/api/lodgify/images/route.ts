import { NextResponse } from "next/server"

// Cache control - cache images for 1 hour
export const revalidate = 3600

// Helper function to add delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const propertyId = searchParams.get("propertyId")

  if (!propertyId) {
    return NextResponse.json({ error: "Property ID is required" }, { status: 400 })
  }

  // Maximum number of retries
  const maxRetries = 3
  let retries = 0
  let success = false
  let responseData = null
  let lastError = null

  while (retries < maxRetries && !success) {
    try {
      // Add exponential backoff delay on retries
      if (retries > 0) {
        const backoffTime = Math.pow(2, retries) * 1000
        console.log(`Retry ${retries}/${maxRetries} after ${backoffTime}ms delay`)
        await delay(backoffTime)
      }

      const response = await fetch(`https://api.lodgify.com/v2/properties/${propertyId}/rooms`, {
        headers: {
          "X-ApiKey": process.env.LODGIFY_API_KEY || "",
          accept: "application/json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      })

      // Check if we hit rate limit (429) or other error
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Retrying with backoff...")
      }

      if (!response.ok) {
        throw new Error(`Lodgify API returned ${response.status}: ${await response.text()}`)
      }

      // Try to parse the response as JSON
      const text = await response.text()
      try {
        responseData = JSON.parse(text)
        success = true
      } catch (parseError) {
        throw new Error(`Failed to parse response as JSON: ${text.substring(0, 100)}...`)
      }
    } catch (error) {
      lastError = error
      retries++
      console.error(`Attempt ${retries}/${maxRetries} failed:`, error)

      // If this was our last retry, we'll exit the loop and handle the error below
      if (retries >= maxRetries) {
        console.error("All retries failed")
      }
    }
  }

  // If we couldn't get the data after all retries, return fallback data
  if (!success || !responseData) {
    console.error("Failed to fetch data from Lodgify API after all retries:", lastError)

    // Return fallback data based on the property ID
    if (propertyId === "673171") {
      // Echo Suite
      return NextResponse.json([
        {
          id: 673171,
          name: "The Echo Suite",
          images: [
            {
              src: "https://sjc.microlink.io/kHduuS2ZaxqtvSUGTOXsjCUP55mORlCOfXGlFVFNPuHNbcUnKmEFEmWpA75QITNaigZ2T3s3oWHkdd-kD6sFRA.jpeg",
              alt: "The Echo Suite - Bedroom with queen bed and coastal decor",
            },
          ],
        },
      ])
    } else if (propertyId === "673142") {
      // Ziggy's Room
      return NextResponse.json([
        {
          id: 673142,
          name: "Ziggy's Room",
          images: [
            {
              src: "https://l.icdbcdn.com/oh/b6c6f5d9-a164-4a44-98b4-e135e56ec654.jpg?f=32",
              alt: "Ziggy's Room - Main View",
            },
          ],
        },
      ])
    } else {
      return NextResponse.json({ error: "Failed to fetch data from Lodgify API" }, { status: 500 })
    }
  }

  // Extract only the images from the response
  const roomImages = responseData.map((room: any) => ({
    id: room.id,
    name: room.name,
    images: room.images.map((img: any) => ({
      src: `https:${img.url}`,
      alt: img.text || room.name,
    })),
  }))

  return NextResponse.json(roomImages)
}
