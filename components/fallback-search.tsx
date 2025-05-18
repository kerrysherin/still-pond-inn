"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Users } from "lucide-react"

export default function FallbackSearch() {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("2")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Construct the URL with query parameters
    const searchParams = new URLSearchParams()
    if (checkIn) searchParams.append("check_in", checkIn)
    if (checkOut) searchParams.append("check_out", checkOut)
    if (guests) searchParams.append("guests", guests)

    // Redirect to the Lodgify search page
    window.open(`https://still-pond-inn.lodgify.com/en/all-properties?${searchParams.toString()}`, "_blank")
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">
            Check-in
          </label>
          <div className="relative">
            <input
              type="date"
              id="check-in"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-window-500 focus:border-window-500"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="flex-1">
          <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">
            Check-out
          </label>
          <div className="relative">
            <input
              type="date"
              id="check-out"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-window-500 focus:border-window-500"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="flex-1">
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
            Guests
          </label>
          <div className="relative">
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-window-500 focus:border-window-500"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="flex items-end">
          <Button
            type="submit"
            className="w-full md:w-auto bg-window-600 hover:bg-window-700 text-white py-2 px-4 rounded-md"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  )
}
