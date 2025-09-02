import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://shadilock-fabrications.com"),
  alternates: {
    canonical: "https://shadilock-fabrications.com",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    siteName: "Shadilock Fabrications",
    locale: "en_US",
    type: "website",
  },
};
