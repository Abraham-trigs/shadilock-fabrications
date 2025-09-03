import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import ResponsiveBackground from "@/components/layout/ResponsiveBackground";
import HeroContent from "@/components/home/HeroContent";
import InfoCards from "@/components/home/InfoCards";
import ImageCarouselWrapper from "@/components/home/ImageCarousel";
import OurServices from "@/components/home/OurServices";
import WhyChooseUs from "@/components/home/WhyChooseUs";

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

const desktopBg = "/hero-desktop.webp";
const laptopBg = "/hero-Tablet.webp";
const mobileBg = "/hero-Mobile.webp";

export default function HomePage() {
  return (
    <main className="relative w-full text-lightText">
      <Navbar />

      <section className="relative w-full min-h-screen flex flex-col">
        <ResponsiveBackground
          desktop={desktopBg}
          laptop={laptopBg}
          mobile={mobileBg}
        />

        {/* Wrapper */}
        <div className="relative z-10 px-4 md:px-12 lg:px-20 py-12 mt-8">
          {/* Mobile */}
          <div className="flex flex-col gap lg:hidden">
            <HeroContent />
            <ImageCarouselWrapper /> {/* ✅ client component */}
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex flex-row items-start gap-6">
            <div className="w-full lg:w-2/3">
              <HeroContent />
            </div>
            <div className="w-full lg:w-1/3 flex justify-center">
              <ImageCarouselWrapper />
            </div>
          </div>
        </div>

        <OurServices />
        <WhyChooseUs />
        <InfoCards />
      </section>
    </main>
  );
}
