"use client"

import { useContext } from "react"
import { RoomDataContext } from "@/components/room-data-provider"

export const useRoomData = () => useContext(RoomDataContext)
