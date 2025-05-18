export default function StaticHeroFallback() {
  return (
    <div className="h-full w-full bg-gradient-to-b from-window-100 to-window-300 flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-3xl font-bold text-window-800 mb-4">Welcome to The Still Pond Inn</h2>
        <p className="text-xl text-window-600">Your peaceful retreat near the Chesapeake Bay</p>
      </div>
    </div>
  )
}
