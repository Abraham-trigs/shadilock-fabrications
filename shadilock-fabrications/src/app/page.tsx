import type { Metadata } from "next";
import HomePageClient from "@/components/home/HomePageClient";

// ✅ SEO Metadata (App Router)
export const metadata: Metadata = {
  title: "Shadilock Fabrications | Metal & Steel Works in Accra",
  description:
    "Shadilock Fabrications specializes in professional metal fabrication, welding, steel structures, and custom fabrication solutions in Accra, Ghana.",
  keywords: [
    "Shadilock",
    "Metal fabrication Accra",
    "Steel works Ghana",
    "Welding services",
    "Custom fabrication",
    "Gate and railing fabrication",
    "Metal engineering Accra",
  ],
  openGraph: {
    title: "Shadilock Fabrications | Metal & Steel Works in Accra",
    description:
      "Trusted experts in metal fabrication, welding, and steel solutions in Accra, Ghana.",
    url: "https://www.shadilock.com",
    siteName: "Shadilock Fabrications",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shadilock Fabrications workshop",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadilock Fabrications",
    description:
      "Professional metal & steel fabrication services in Accra, Ghana.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <HomePageClient />;
}
