// ./src/app/page.metadata.ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shadilock Fabrications | Home",
  description:
    "Shadilock Fabrications specializes in high-quality fabrication services, delivering durable and custom-made solutions for all your needs.",
  metadataBase: new URL("https://shadilock-fabrications.com"),
  alternates: {
    canonical: "https://shadilock-fabrications.com",
  },
  openGraph: {
    title: "Shadilock Fabrications | Home",
    description:
      "Shadilock Fabrications specializes in high-quality fabrication services, delivering durable and custom-made solutions for all your needs.",
    url: "https://shadilock-fabrications.com",
    siteName: "Shadilock Fabrications",
    images: [
      {
        url: "/images/og-image.jpg", // update this with your actual OG image path
        width: 1200,
        height: 630,
        alt: "Shadilock Fabrications",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};
