import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-wood-50 border-t border-wood-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          {/* Combined logo stack */}
          <div className="flex flex-col items-center">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="The Still Pond Inn Window Logo"
                width={150}
                height={60}
                className="h-auto"
              />
            </Link>
            <Link href="/" className="-mt-5">
              <img
                src="/images/the-still-pond-inn.svg"
                alt="The Still Pond Inn Logo"
                width={180}
                height={60}
                className="h-auto"
              />
            </Link>
          </div>

          {/* Address text moved up closer to the SVG */}
          <div className="text-center text-wood-700 text-sm mt-2">
            <p>13738 Still Pond RD, Still Pond, MD 21667</p>
            <p>410-708-1525 | thestillpondinn@gmail.com</p>
          </div>

          <p className="text-wood-500 text-xs mt-4">
            &copy; {new Date().getFullYear()} The Still Pond Inn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
