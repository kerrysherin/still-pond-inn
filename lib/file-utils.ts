/**
 * Utility function to check if a file exists by making a HEAD request
 */
export async function fileExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.error(`Error checking if file exists at ${url}:`, error)
    return false
  }
}

/**
 * Get a fallback image URL based on the type of content
 */
export function getFallbackImage(type: "hero" | "room" | "general" = "general"): string {
  switch (type) {
    case "hero":
      return "/images/chesapeake-bay-fallback.jpg"
    case "room":
      return "/images/room-fallback.jpg"
    default:
      return "/images/fallback.jpg"
  }
}
