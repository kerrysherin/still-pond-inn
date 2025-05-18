import Header from "@/components/header"
import Footer from "@/components/footer"
import RoomCard from "@/components/room-card"

// Initial room data (hardcoded as requested)
const rooms = [
  {
    title: "The Echo Suite",
    description:
      "Our premium suite with bay views, featuring a spacious layout and luxury amenities for the perfect getaway.",
    images: [
      {
        src: "https://l.icdbcdn.com/oh/f4ef6f39-3e00-44e7-b585-b01cc2a6ee32.jpg?f=32",
        alt: "The Echo Suite - Main View",
      },
      {
        src: "https://l.icdbcdn.com/oh/cf689c81-81f6-411f-a306-dcac87d5c89a.jpg?f=32",
        alt: "The Echo Suite - Bedroom",
      },
      {
        src: "https://l.icdbcdn.com/oh/06403d6b-bda9-4d05-abd4-de12a8b63ffa.jpg?f=32",
        alt: "The Echo Suite - Living Area",
      },
    ],
    price: 189,
    beds: [
      { type: "Queen", count: 1 },
      { type: "Pull-out", count: 1 },
    ],
    bathrooms: 1,
    maxGuests: 3,
    amenities: ["wifi", "ac", "tv", "coffee", "kitchen"],
    rentalId: "673171",
  },
  {
    title: "Ziggy's Room",
    description:
      "A cozy retreat with charming decor and all the comforts of home, perfect for couples or solo travelers.",
    images: [
      {
        src: "https://l.icdbcdn.com/oh/b6c6f5d9-a164-4a44-98b4-e135e56ec654.jpg?f=32",
        alt: "Ziggy's Room - Main View",
      },
      {
        src: "https://l.icdbcdn.com/oh/4efe0124-2450-4a96-89ba-00a5ea1b3e8f.jpg?f=32",
        alt: "Ziggy's Room - Bedroom View",
      },
      {
        src: "https://l.icdbcdn.com/oh/665193d1-49aa-461f-b455-cc302d7fd8bc.jpg?f=32",
        alt: "Ziggy's Room - Another View",
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
        src: "https://l.icdbcdn.com/oh/fb542218-5b74-4efe-8921-8ab8ca24bc53.jpg?f=32",
        alt: "Turtle Cove - Main View",
      },
      {
        src: "https://l.icdbcdn.com/oh/4ec5fab3-30f3-46ea-a807-022675ac3c3c.jpg?f=32",
        alt: "Turtle Cove - Room Detail",
      },
      {
        src: "https://l.icdbcdn.com/oh/19882e6f-42d8-4d25-bf83-8a58e1e94b50.jpg?f=32",
        alt: "Turtle Cove - Bathroom",
      },
    ],
    price: 159,
    beds: [{ type: "Queen", count: 1 }],
    bathrooms: 1,
    maxGuests: 2,
    amenities: ["wifi", "ac", "tv", "coffee"],
  },
]

export default function RoomsPage() {
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
