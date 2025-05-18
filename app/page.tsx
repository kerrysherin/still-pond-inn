import { Phone, Mail, MapPin } from "lucide-react"
import ContactForm from "@/components/contact-form"
import Header from "@/components/header"
import Footer from "@/components/footer"
import LodgifySearchBar from "@/components/lodgify-search-bar"
import RoomImageCarousel from "@/components/room-image-carousel"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header is now outside the hero section */}
      <Header />

      {/* Full height hero section */}
      <div className="h-[calc(100vh-var(--header-height))] relative">
        {/* Video Hero Section */}
        <section className="h-full relative">
          <div className="absolute inset-0 overflow-hidden">
            {/* Using the original video tag with poster that was working before */}
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/videos/chesapeake-thumbnail.png"
              className="h-full w-full object-cover"
            >
              <source src="/videos/chesapeake.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* White gradient overlay - top */}
            <div className="absolute inset-0 bg-gradient-overlay-top pointer-events-none"></div>

            {/* White gradient overlay - bottom */}
            <div className="absolute inset-0 bg-gradient-overlay-bottom pointer-events-none"></div>

            {/* Existing dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Hero content - moved to top on mobile and md screens, centered on larger screens */}
          <div className="relative z-10 h-full">
            {/* Hero text - positioned at top on all screens except xl+, where it's centered */}
            <div className="container">
              <div className="pt-8 sm:pt-12 md:pt-16 xl:absolute xl:inset-0 xl:flex xl:flex-col xl:items-center xl:justify-center xl:text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#2d6d9e] xl:text-white">
                  Your Window to the Chesapeake
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-white/90 xl:mx-auto">
                  A peaceful retreat near the Chesapeake Bay
                </p>
              </div>
            </div>

            {/* Lodgify Search Widget - positioned in the middle-bottom area */}
            <div className="absolute bottom-1/4 left-0 right-0 z-20 px-4 sm:px-8 md:px-12 lg:px-16 md:bottom-28 lg:bottom-32">
              <div className="w-full">
                <LodgifySearchBar />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Rest of the content remains unchanged */}
      <main className="flex-1">
        {/* About Section */}
        <section id="about" className="bg-wood-50 py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-wood-800 sm:text-4xl">Our Story</h2>
              <div className="mt-6 space-y-4 text-lg text-wood-900">
                <p>
                  Nestled in the charming town of Still Pond, our inn offers a serene escape from the hustle and bustle
                  of everyday life. Just a short drive from the Chesapeake Bay, our property combines coastal elegance
                  with warm hospitality to create an unforgettable experience.
                </p>
                <p>
                  Named after the peaceful waters nearby, our inn has been a beloved destination for travelers seeking
                  both relaxation and adventure in the Chesapeake region. Whether you're exploring the local beaches,
                  enjoying water activities, or discovering the rich maritime heritage of the area, The Still Pond Inn
                  provides the perfect home base for your Chesapeake Bay journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Amenities Section - with scroll-margin-top */}
        <section id="amenities" className="py-16">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tight text-wood-800 sm:text-4xl">Inn Amenities</h2>

            {/* Room Features */}
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-center text-window-700 mb-8">Our Rooms Feature</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Ensuite Bathrooms",
                    description: "Private bathrooms with large walk-in showers for your comfort.",
                  },
                  {
                    title: "Refrigerator",
                    description: "Keep your drinks and snacks cool during your stay.",
                  },
                  {
                    title: "Air Conditioning",
                    description: "Stay comfortable year-round with individual climate control.",
                  },
                  {
                    title: "Microwave & Coffee Maker",
                    description: "Enjoy the convenience of in-room refreshments anytime.",
                  },
                  {
                    title: "Free Wi-Fi",
                    description: "Stay connected with complimentary high-speed internet throughout your stay.",
                  },
                  {
                    title: "Outdoor Patio",
                    description: "Relax and enjoy the beautiful surroundings in our outdoor seating area.",
                  },
                ].map((amenity, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-window-200 bg-white p-6 shadow-sm 
                             transition-all duration-300 ease-in-out 
                             hover:shadow-lg hover:shadow-window-100/50 hover:border-window-400 
                             hover:-translate-y-1 hover:bg-window-50 group"
                  >
                    <h4 className="text-xl font-medium text-window-700 group-hover:text-window-800 transition-colors duration-300">
                      {amenity.title}
                    </h4>
                    <p className="mt-2 text-wood-700 group-hover:text-wood-800 transition-colors duration-300">
                      {amenity.description}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-center mt-6 text-lg font-medium text-wood-700">and more!</p>
            </div>
          </div>
        </section>

        {/* Room Image Carousel - NEW SECTION - Removed bottom padding */}
        <section className="pt-8 pb-0 bg-white">
          <div className="container mb-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-wood-800 sm:text-4xl mb-8">
              Explore Our Accommodations
            </h2>
            <p className="text-center text-lg text-wood-700 max-w-3xl mx-auto mb-8">
              Take a visual tour of our beautifully appointed rooms and suites, each designed to provide comfort and
              relaxation during your stay at The Still Pond Inn.
            </p>
          </div>
          <RoomImageCarousel />
        </section>

        {/* Location Features - Removed top padding */}
        <section className="pb-16 pt-0 bg-wood-50">
          <div className="container pt-16">
            <h3 className="text-2xl font-semibold text-center text-window-700 mb-8">The Location</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {[
                {
                  title: "1 Mile from Betterton Beach",
                  description: "Just a short drive to beautiful sandy beaches and swimming.",
                },
                {
                  title: "Private Entrance",
                  description: "Enjoy the privacy and convenience of your own dedicated entrance.",
                },
                {
                  title: "Boat Parking",
                  description: "Bring your boat! We offer convenient parking for water enthusiasts.",
                },
                {
                  title: "Room Options",
                  description: "Choose between a cozy queen room or spacious queen suites.",
                },
              ].map((amenity, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-window-200 bg-white p-6 shadow-sm 
                           overflow-hidden relative
                           transition-all duration-300 ease-in-out 
                           hover:shadow-lg hover:shadow-window-100/50 hover:border-window-400 
                           group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-window-100/0 to-window-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <h4 className="text-xl font-medium text-window-700 group-hover:text-window-800 transition-colors duration-300">
                      {amenity.title}
                    </h4>
                    <p className="mt-2 text-wood-700 group-hover:text-wood-800 transition-colors duration-300">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - with scroll-margin-top */}
        <section id="contact" className="py-16">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-center text-3xl font-bold tracking-tight text-wood-800 sm:text-4xl">Contact Us</h2>
              <p className="mt-4 text-center text-lg text-wood-700">
                We'd love to hear from you. Reach out to plan your stay or ask any questions.
              </p>

              <div className="mt-12 grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-window-100">
                      <Phone className="h-6 w-6 text-window-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-wood-800">Call Us</h3>
                      <a href="tel:+14107081525" className="text-wood-700 hover:text-window-700 hover:underline">
                        410-708-1525
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-window-100">
                      <Mail className="h-6 w-6 text-window-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-wood-800">Email Us</h3>
                      <a
                        href="mailto:thestillpondinn@gmail.com"
                        className="text-wood-700 hover:text-window-700 hover:underline"
                      >
                        thestillpondinn@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-window-100">
                      <MapPin className="h-6 w-6 text-window-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-wood-800">Visit Us</h3>
                      <address className="not-italic text-wood-700">
                        13738 Still Pond RD
                        <br />
                        Still Pond, MD 21667
                      </address>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-wood-800">Text Us</h3>
                    <p className="text-wood-700">
                      Send a text to{" "}
                      <a href="sms:+14107081525" className="text-window-700 hover:underline">
                        410-708-1525
                      </a>{" "}
                      and we'll get back to you shortly.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-window-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-xl font-medium text-wood-800">Send us a message</h3>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
