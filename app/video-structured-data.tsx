export default function VideoStructuredData() {
  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Chesapeake Bay Boat Footage - The Still Pond Inn",
    description:
      "Beautiful boat footage on the Chesapeake Bay near The Still Pond Inn. Experience the serene waters and maritime charm of the Chesapeake region.",
    thumbnailUrl: ["https://thestillpondinn.com/videos/chesapeake-bay-720p.png"],
    uploadDate: "2024-04-04T08:00:00-04:00",
    duration: "PT15S",
    contentUrl: "https://thestillpondinn.com/videos/chesapeake.mp4",
    embedUrl: "https://thestillpondinn.com/videos/chesapeake.mp4",
    publisher: {
      "@type": "Organization",
      name: "The Still Pond Inn",
      logo: {
        "@type": "ImageObject",
        url: "https://thestillpondinn.com/images/logo.png",
        width: "300",
        height: "120",
      },
    },
    inLanguage: "en-US",
    keywords: "Chesapeake Bay, boats, sailing, Still Pond Inn, Maryland waterfront",
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
}

