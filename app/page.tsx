import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import ContactForm from "@/components/contact-form"
import Header from "@/components/header"
import Footer from "@/components/footer"

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
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/videos/chesapeake-bay-720p.png"
              className="h-full w-full object-cover"
            >
              <source src="/videos/chesapeake-bay.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* White gradient overlay - top */}
            <div className="absolute inset-0 bg-gradient-overlay-top pointer-events-none"></div>

            {/* White gradient overlay - bottom */}
            <div className="absolute inset-0 bg-gradient-overlay-bottom pointer-events-none"></div>

            {/* Existing dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Your Window to the Chesapeake</h1>
            <p className="mt-4 max-w-2xl text-lg md:text-lg lg:text-lg text-white/90">
              A peaceful retreat near the Chesapeake Bay
            </p>
            <Link href="#contact">
              <Button className="mt-8 bg-window-600 hover:bg-window-700 text-base sm:text-lg px-6 py-3 h-auto">
                Plan Your Visit
              </Button>
            </Link>
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

            {/* Location Features */}
            <div className="mt-16">
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

