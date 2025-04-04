export default function VacationRentalStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    identifier: "still-pond-inn-21667",
    additionalType: "https://schema.org/LodgingBusiness",
    brand: {
      "@type": "Brand",
      name: "The Still Pond Inn",
    },
    containsPlace: {
      "@type": "Accommodation",
      additionalType: "https://schema.org/Suite",
      bed: [
        {
          "@type": "BedDetails",
          numberOfBeds: 1,
          typeOfBed: "Queen",
        },
        {
          "@type": "BedDetails",
          numberOfBeds: 2,
          typeOfBed: "Queen",
        },
      ],
      occupancy: {
        "@type": "QuantitativeValue",
        value: 4,
      },
      amenityFeature: [
        {
          "@type": "LocationFeatureSpecification",
          name: "ac",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "wifi",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "privateEntrance",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "beachAccess",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "refrigerator",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "microwave",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "coffeeMaker",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "patio",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "boatParking",
          value: true,
        },
      ],
      numberOfBathroomsTotal: 2,
      numberOfBedrooms: 2,
      numberOfRooms: 4,
    },
    latitude: "39.3304",
    longitude: "-76.0083",
    name: "The Still Pond Inn",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
      addressLocality: "Still Pond",
      addressRegion: "MD",
      postalCode: "21667",
      streetAddress: "13738 Still Pond RD",
    },
    image: [
      "https://thestillpondinn.com/images/exterior1.jpg",
      "https://thestillpondinn.com/images/exterior2.jpg",
      "https://thestillpondinn.com/images/room1.jpg",
      "https://thestillpondinn.com/images/room2.jpg",
      "https://thestillpondinn.com/images/bathroom1.jpg",
      "https://thestillpondinn.com/images/bathroom2.jpg",
      "https://thestillpondinn.com/images/patio.jpg",
      "https://thestillpondinn.com/images/surroundings.jpg",
    ],
    checkinTime: "15:00:00-04:00",
    checkoutTime: "11:00:00-04:00",
    description:
      "Nestled in the charming town of Still Pond, our inn offers a serene escape from the hustle and bustle of everyday life. Just a short drive from the Chesapeake Bay and only 1 mile from Betterton Beach.",
    knowsLanguage: ["en-US"],
    telephone: "+14107088235",
    email: "thestillpondinn@gmail.com",
    priceRange: "$$",
    petsAllowed: false,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.8,
      reviewCount: 15,
      bestRating: 5,
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
        },
        author: {
          "@type": "Person",
          name: "Sarah J.",
        },
        datePublished: "2023-08-15",
        reviewBody:
          "Beautiful accommodations just a short drive from the beach. The rooms were spotless and the hosts were incredibly welcoming. Will definitely return!",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 4,
          bestRating: 5,
        },
        author: {
          "@type": "Person",
          name: "Michael T.",
        },
        datePublished: "2023-07-22",
        reviewBody:
          "Great place to stay while exploring the Chesapeake region. Comfortable beds and the private entrance was a nice touch.",
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

