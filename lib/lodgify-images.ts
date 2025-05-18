// This file will store and export all the image data fetched from Lodgify

import "server-only"

// Define types for our image data
export interface LodgifyImage {
  src: string
  alt: string
}

export interface RoomImages {
  id: string
  name: string
  images: LodgifyImage[]
}

// Cache for room images
let cachedZiggyImages: LodgifyImage[] | null = null
let cachedEchoImages: LodgifyImage[] | null = null

// Fallback images in case API fails
const fallbackImages = {
  "673142": [
    {
      src: "https://l.icdbcdn.com/oh/b6c6f5d9-a164-4a44-98b4-e135e56ec654.jpg?f=32",
      alt: "Ziggy's Room - Main View",
    },
    {
      src: "https://l.icdbcdn.com/oh/4efe0124-2450-4a96-89ba-00a5ea1b3e8f.jpg?f=32",
      alt: "Ziggy's Room - Bedroom View",
    },
  ],
  "673171": [
    {
      src: "https://sjc.microlink.io/kHduuS2ZaxqtvSUGTOXsjCUP55mORlCOfXGlFVFNPuHNbcUnKmEFEmWpA75QITNaigZ2T3s3oWHkdd-kD6sFRA.jpeg",
      alt: "The Echo Suite - Bedroom",
    },
  ],
}

// Function to fetch images from Lodgify API
async function fetchImagesFromLodgify(propertyId: string): Promise<LodgifyImage[]> {
  try {
    const response = await fetch(`https://api.lodgify.com/v2/properties/${propertyId}/rooms`, {
      headers: {
        "X-ApiKey": process.env.LODGIFY_API_KEY || "",
        accept: "application/json",
      },
      // Cache for 24 hours (86400 seconds)
      next: { revalidate: 86400 },
    })

    if (!response.ok) {
      throw new Error(`Lodgify API returned ${response.status}`)
    }

    const data = await response.json()

    if (!data || !data[0] || !data[0].images) {
      throw new Error("Invalid data structure from Lodgify API")
    }

    // Extract and format images
    return data[0].images.map((img: any) => ({
      src: `https:${img.url}`,
      alt: img.text || data[0].name || `Room ${propertyId}`,
    }))
  } catch (error) {
    console.error(`Error fetching images for property ${propertyId}:`, error)
    // Return fallback images if API call fails
    return fallbackImages[propertyId as keyof typeof fallbackImages] || []
  }
}

// Function to get Ziggy's Room images (cached)
export async function getZiggyImages(): Promise<LodgifyImage[]> {
  if (cachedZiggyImages) {
    return cachedZiggyImages
  }

  try {
    const images = await fetchImagesFromLodgify("673142")
    cachedZiggyImages = images
    return images
  } catch (error) {
    console.error("Error getting Ziggy's Room images:", error)
    return fallbackImages["673142"]
  }
}

// Function to get Echo Suite images (cached)
export async function getEchoImages(): Promise<LodgifyImage[]> {
  if (cachedEchoImages) {
    return cachedEchoImages
  }

  try {
    const images = await fetchImagesFromLodgify("673171")
    cachedEchoImages = images
    return images
  } catch (error) {
    console.error("Error getting Echo Suite images:", error)
    return fallbackImages["673171"]
  }
}

// Function to get all room images at once
export async function getAllRoomImages(): Promise<RoomImages[]> {
  try {
    const [ziggyImages, echoImages] = await Promise.all([getZiggyImages(), getEchoImages()])

    return [
      {
        id: "673142",
        name: "Ziggy's Room",
        images: ziggyImages,
      },
      {
        id: "673171",
        name: "The Echo Suite",
        images: echoImages,
      },
    ]
  } catch (error) {
    console.error("Error getting all room images:", error)
    return [
      {
        id: "673142",
        name: "Ziggy's Room",
        images: fallbackImages["673142"],
      },
      {
        id: "673171",
        name: "The Echo Suite",
        images: fallbackImages["673171"],
      },
    ]
  }
}
