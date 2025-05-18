"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bug, RefreshCw, ExternalLink } from "lucide-react"

interface DebugInfo {
  scriptLoaded: boolean
  initAttempts: number
  lastAttempt: string | null
  initialized: boolean
  lastError: string | null
  LodgifySearchBarExists: boolean
  LodgifyInitExists: boolean
  searchBarElement: string
}

export default function LodgifyDebug() {
  const [isOpen, setIsOpen] = useState(false)
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null)

  const refreshDebugInfo = () => {
    if (typeof window !== "undefined" && typeof window.debugLodgify === "function") {
      // Call the debug function defined in layout.tsx
      window.debugLodgify()

      // Get the debug info
      setDebugInfo({
        scriptLoaded: window.lodgifyDebug?.scriptLoaded || false,
        initAttempts: window.lodgifyDebug?.initAttempts || 0,
        lastAttempt: window.lodgifyDebug?.lastAttempt || null,
        initialized: window.lodgifyDebug?.initialized || false,
        lastError: window.lodgifyDebug?.lastError || null,
        LodgifySearchBarExists: typeof window.LodgifySearchBar !== "undefined",
        LodgifyInitExists:
          typeof window.LodgifySearchBar !== "undefined" ? typeof window.LodgifySearchBar.init === "function" : false,
        searchBarElement: document.getElementById("lodgify-search-bar") ? "exists" : "missing",
      })
    }
  }

  const forceInitialize = () => {
    if (
      typeof window !== "undefined" &&
      typeof window.LodgifySearchBar !== "undefined" &&
      typeof window.LodgifySearchBar.init === "function"
    ) {
      try {
        window.LodgifySearchBar.init()
        refreshDebugInfo()
      } catch (e) {
        console.error("Force initialization failed:", e)
      }
    }
  }

  const reloadScript = () => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script")
      script.src = "https://app.lodgify.com/portable-search-bar/stable/renderPortableSearchBar.js"
      script.async = true
      script.onload = () => {
        console.log("Lodgify script reloaded")
        setTimeout(() => {
          forceInitialize()
          refreshDebugInfo()
        }, 1000)
      }
      document.body.appendChild(script)
    }
  }

  useEffect(() => {
    if (isOpen) {
      refreshDebugInfo()
    }
  }, [isOpen])

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-white shadow-md"
      >
        <Bug className="h-4 w-4 mr-1" />
        Debug
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-80">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Lodgify Debug</h3>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
          ✕
        </Button>
      </div>

      <div className="text-xs space-y-1 mb-3">
        {debugInfo ? (
          <>
            <p>
              Script loaded:{" "}
              <span className={debugInfo.scriptLoaded ? "text-green-600" : "text-red-600"}>
                {debugInfo.scriptLoaded ? "Yes" : "No"}
              </span>
            </p>
            <p>Initialization attempts: {debugInfo.initAttempts}</p>
            <p>Last attempt: {debugInfo.lastAttempt || "None"}</p>
            <p>
              Initialized:{" "}
              <span className={debugInfo.initialized ? "text-green-600" : "text-red-600"}>
                {debugInfo.initialized ? "Yes" : "No"}
              </span>
            </p>
            <p>
              Lodgify object exists:{" "}
              <span className={debugInfo.LodgifySearchBarExists ? "text-green-600" : "text-red-600"}>
                {debugInfo.LodgifySearchBarExists ? "Yes" : "No"}
              </span>
            </p>
            <p>
              Init function exists:{" "}
              <span className={debugInfo.LodgifyInitExists ? "text-green-600" : "text-red-600"}>
                {debugInfo.LodgifyInitExists ? "Yes" : "No"}
              </span>
            </p>
            <p>
              Search bar element:{" "}
              <span className={debugInfo.searchBarElement === "exists" ? "text-green-600" : "text-red-600"}>
                {debugInfo.searchBarElement}
              </span>
            </p>
            {debugInfo.lastError && <p className="text-red-600">Error: {debugInfo.lastError}</p>}
          </>
        ) : (
          <p>Loading debug info...</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Button size="sm" onClick={refreshDebugInfo}>
          <RefreshCw className="h-3 w-3 mr-1" />
          Refresh Info
        </Button>

        <Button size="sm" onClick={forceInitialize}>
          Force Initialize
        </Button>

        <Button size="sm" onClick={reloadScript}>
          Reload Script
        </Button>

        <a
          href="https://still-pond-inn.lodgify.com/en/all-properties"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-window-600 hover:underline flex items-center justify-center mt-1"
        >
          Open Lodgify Search <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>
    </div>
  )
}
