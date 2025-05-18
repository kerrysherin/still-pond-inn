import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const propertyId = searchParams.get("propertyId")

  if (!propertyId) {
    return NextResponse.json({ error: "Property ID is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`https://api.lodgify.com/v2/properties/${propertyId}/rooms`, {
      headers: {
        "X-ApiKey": process.env.LODGIFY_API_KEY || "",
        accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Lodgify API returned ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching from Lodgify API:", error)

    // Return a fallback response with basic room data
    if (propertyId === "673142") {
      // Ziggy's Room fallback
      return NextResponse.json([
        {
          id: 673142,
          name: "Ziggy's Room",
          description: "A cozy retreat with charming decor and all the comforts of home.",
          max_people: 2,
          bedrooms: 1,
          bathrooms: 1,
          min_price: 149,
          images: fallbackImages["673142"],
        },
      ])
    } else if (propertyId === "673171") {
      // Echo Suite fallback
      return NextResponse.json([
        {
          id: 673171,
          name: "The Echo Suite",
          description: "Our premium suite with bay views, featuring a spacious layout and luxury amenities.",
          max_people: 3,
          bedrooms: 1,
          bathrooms: 1,
          min_price: 189,
          images: fallbackImages["673171"],
        },
      ])
    }

    return NextResponse.json({ error: "Failed to fetch data from Lodgify" }, { status: 500 })
  }
}

// Fallback images in case API fails
const fallbackImages = {
  "673142": [
    {
      text: "Ziggy's Room - Main View",
      url: "//l.icdbcdn.com/oh/b6c6f5d9-a164-4a44-98b4-e135e56ec654.jpg?f=32",
    },
    {
      text: "Ziggy's Room - Bedroom View",
      url: "//l.icdbcdn.com/oh/4efe0124-2450-4a96-89ba-00a5ea1b3e8f.jpg?f=32",
    },
  ],
  "673171": [
    {
      text: "The Echo Suite - Bedroom",
      url: "//l.icdbcdn.com/oh/f4ef6f39-3e00-44e7-b585-b01cc2a6ee32.jpg?f=32",
    },
  ],
}
