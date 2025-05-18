import Header from "@/components/header"
import Footer from "@/components/footer"
import RoomCard from "@/components/room-card"

export default function RoomsPage() {
  // Room data
  const rooms = [
    {
      title: "The Echo Suite",
      description:
        "Our premium suite with bay views, featuring a spacious layout and luxury amenities for the perfect getaway.",
      images: [
        {
          src: "/placeholder-st6c2.png",
          alt: "The Echo Suite - Main View",
        },
        {
          src: "/placeholder-cd576.png",
          alt: "The Echo Suite - Bedroom",
        },
        {
          src: "/placeholder-axs0k.png",
          alt: "The Echo Suite - Bathroom",
        },
      ],
      price: 189,
      beds: [{ type: "Queen", count: 2 }],
      bathrooms: 1,
      maxGuests: 4,
      amenities: ["wifi", "ac", "tv", "coffee", "kitchen"],
      rentalId: "673171",
    },
    {
      title: "Ziggy's Room",
      description:
        "A cozy retreat with charming decor and all the comforts of home, perfect for couples or solo travelers.",
      images: [
        {
          src: "/placeholder-zud8g.png",
          alt: "Ziggy's Room - Main View",
        },
        {
          src: "/placeholder-cmxwq.png",
          alt: "Ziggy's Room - Sitting Area",
        },
        {
          src: "/modern-bathroom-with-shower.png",
          alt: "Ziggy's Room - Bathroom",
        },
      ],
      price: 149,
      beds: [{ type: "Queen", count: 1 }],
      bathrooms: 1,
      maxGuests: 2,
      amenities: ["wifi", "ac", "tv", "coffee"],
      rentalId: "673142",
    },
    {
      title: "Turtle Cove",
      description:
        "A serene space inspired by the Chesapeake's wildlife, offering comfort and tranquility for your stay.",
      images: [
        {
          src: "/placeholder-hgsnv.png",
          alt: "Turtle Cove - Main View",
        },
        {
          src: "/placeholder-coy9l.png",
          alt: "Turtle Cove - Window View",
        },
        {
          src: "/placeholder-8msqq.png",
          alt: "Turtle Cove - Bathroom",
        },
      ],
      price: 159,
      beds: [
        { type: "Queen", count: 1 },
        { type: "Twin", count: 1 },
      ],
      bathrooms: 1,
      maxGuests: 3,
      amenities: ["wifi", "ac", "tv", "coffee"],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Page title section */}
      <section className="bg-window-50 py-8 md:py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-window-800">Our Rooms</h1>
          <p className="mt-4 text-center text-wood-700 max-w-2xl mx-auto">
            Experience comfort and tranquility in our thoughtfully designed accommodations at The Still Pond Inn.
          </p>
        </div>
      </section>

      {/* Room listings */}
      <section className="py-12 bg-wood-50">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room.title} {...room} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional information */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-window-800 mb-4">Room Information</h2>
            <div className="space-y-4 text-wood-700">
              <p>
                All rooms at The Still Pond Inn include private entrances, ensuite bathrooms, and complimentary Wi-Fi.
                Check-in time is 3:00 PM, and check-out time is 11:00 AM.
              </p>
              <p>
                For special requests or accessibility needs, please contact us directly at 410-708-1525 or
                thestillpondinn@gmail.com.
              </p>
              <p className="font-medium text-window-700">We look forward to welcoming you to The Still Pond Inn!</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
