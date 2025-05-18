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
    return NextResponse.json({ error: "Failed to fetch data from Lodgify" }, { status: 500 })
  }
}
