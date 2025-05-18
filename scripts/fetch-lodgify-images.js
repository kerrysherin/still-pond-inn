// This script fetches images from Lodgify API and saves them to a JSON file
// Run this script during build time with: node scripts/fetch-lodgify-images.js

const fs = require("fs")
const path = require("path")
const https = require("https")

// Room IDs to fetch
const ROOM_IDS = ["673142", "673171"] // Ziggy's Room and Echo Suite
const API_KEY = process.env.LODGIFY_API_KEY

if (!API_KEY) {
  console.error("Error: LODGIFY_API_KEY environment variable is not set")
  process.exit(1)
}

// Fallback images in case API fails
const fallbackImages = {
  673142: [
    {
      src: "https://l.icdbcdn.com/oh/b6c6f5d9-a164-4a44-98b4-e135e56ec654.jpg?f=32",
      alt: "Ziggy's Room - Main View",
    },
  ],
  673171: [
    {
      src: "https://sjc.microlink.io/kHduuS2ZaxqtvSUGTOXsjCUP55mORlCOfXGlFVFNPuHNbcUnKmEFEmWpA75QITNaigZ2T3s3oWHkdd-kD6sFRA.jpeg",
      alt: "The Echo Suite - Bedroom",
    },
  ],
}

// Function to fetch data from Lodgify API
function fetchLodgifyData(roomId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.lodgify.com",
      path: `/v2/properties/${roomId}/rooms`,
      method: "GET",
      headers: {
        "X-ApiKey": API_KEY,
        accept: "application/json",
      },
    }

    const req = https.request(options, (res) => {
      let data = ""

      res.on("data", (chunk) => {
        data += chunk
      })

      res.on("end", () => {
        if (res.statusCode !== 200) {
          console.warn(`Warning: API returned status ${res.statusCode} for room ${roomId}`)
          resolve({
            id: roomId,
            name: roomId === "673142" ? "Ziggy's Room" : "The Echo Suite",
            images: fallbackImages[roomId] || [],
          })
          return
        }

        try {
          const parsedData = JSON.parse(data)

          if (!parsedData || !parsedData[0] || !parsedData[0].images) {
            throw new Error("Invalid data structure")
          }

          const roomData = {
            id: roomId,
            name: parsedData[0].name,
            images: parsedData[0].images.map((img) => ({
              src: `https:${img.url}`,
              alt: img.text || parsedData[0].name,
            })),
          }

          resolve(roomData)
        } catch (error) {
          console.error(`Error parsing data for room ${roomId}:`, error)
          resolve({
            id: roomId,
            name: roomId === "673142" ? "Ziggy's Room" : "The Echo Suite",
            images: fallbackImages[roomId] || [],
          })
        }
      })
    })

    req.on("error", (error) => {
      console.error(`Error fetching data for room ${roomId}:`, error)
      resolve({
        id: roomId,
        name: roomId === "673142" ? "Ziggy's Room" : "The Echo Suite",
        images: fallbackImages[roomId] || [],
      })
    })

    req.end()
  })
}

// Main function to fetch all room data and save to JSON
async function fetchAndSaveRoomData() {
  try {
    console.log("Fetching room data from Lodgify API...")

    const roomDataPromises = ROOM_IDS.map((id) => fetchLodgifyData(id))
    const roomsData = await Promise.all(roomDataPromises)

    const outputData = {
      lastFetched: new Date().toISOString(),
      rooms: roomsData,
    }

    // Create data directory if it doesn't exist
    const dataDir = path.join(__dirname, "..", "data")
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Write data to JSON file
    const outputPath = path.join(dataDir, "room-images.json")
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2))

    console.log(`Successfully saved room data to ${outputPath}`)
  } catch (error) {
    console.error("Error fetching and saving room data:", error)
    process.exit(1)
  }
}

// Run the script
fetchAndSaveRoomData()
