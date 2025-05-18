"use client"

import { useState, useEffect } from "react"

interface LodgifyRoom {
  id: number
  name: string
  description: string
  image_url: string
  max_people: number
  bedrooms: number
  bathrooms: number
  min_price: number
  images: {
    text: string
    url: string
  }[]
  amenities: {
    [category: string]: {
      name: string
      prefix: string | null
      bracket: string | null
      text: string
    }[]
  }
}

interface UseLodgifyDataProps {
  propertyId: string
}

export function useLodgifyData({ propertyId }: UseLodgifyDataProps) {
  const [data, setData] = useState<LodgifyRoom[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/lodgify?propertyId=${propertyId}`)

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        console.error("Error fetching Lodgify data:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    if (propertyId) {
      fetchData()
    }
  }, [propertyId])

  return { data, isLoading, error }
}
