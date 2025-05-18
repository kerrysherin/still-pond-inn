"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-wood-50 px-4">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-window-800 mb-4">Something went wrong</h2>
            <p className="text-wood-700 mb-6">
              We apologize for the inconvenience. The Still Pond Inn website encountered an unexpected error.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => reset()} className="bg-window-600 hover:bg-window-700">
                Try again
              </Button>
              <Button variant="outline" onClick={() => (window.location.href = "/")}>
                Go to homepage
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
