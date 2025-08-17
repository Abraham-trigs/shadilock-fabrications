import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import ResponsiveBackground from "@/components/layout/ResponsiveBackground";
import HeroContent from "@/components/home/HeroContent";
import InfoCards from "@/components/home/InfoCards";
import ImageCarousel from "@/components/home/ImageCarousel";
import OurServices from "@/components/home/OurServices";
import WhyChooseUs from "@/components/home/WhyChooseUs";

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
        url: "/og-image.jpg", // 🔄 replace with your real OG image
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
    images: ["/og-image.jpg"], // 🔄 same OG image for Twitter
  },
};

const desktopBg = "./hero-desktop.webp";
const laptopBg = "./hero-Tablet.webp";
const mobileBg = "./hero-Mobile.webp";

const carouselImages = [
  "/img1.avif",
  "/img2.avif",
  "/img3.avif",
  "/img4.avif",
  "/img5.avif",
];

export default function HomePage() {
  return (
    <main className="relative w-full text-lightText">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col">
        {/* Background */}
        <ResponsiveBackground
          desktop={desktopBg}
          laptop={laptopBg}
          mobile={mobileBg}
        />

        {/* Wrapper */}
        <div className="relative z-10 px-4 md:px-12 lg:px-20 py-12 mt-10">
          {/* Mobile Layout (stacked: Hero -> Carousel) */}
          <div className="flex flex-col gap-8 lg:hidden">
            <HeroContent />
            <ImageCarousel images={carouselImages} interval={4000} />
          </div>

          {/* Tablet/Desktop Layout (side by side) */}
          <div className="hidden lg:flex flex-row items-start gap-6">
            {/* Left: Hero */}
            <div className="w-full lg:w-2/3">
              <HeroContent />
            </div>
            {/* Right: Carousel */}
            <div className="w-full lg:w-1/3 flex justify-center">
              <ImageCarousel images={carouselImages} interval={4000} />
            </div>
          </div>
        </div>
        <OurServices />
        <InfoCards />
        <WhyChooseUs />
      </section>

      {/* Footer */}
      <footer className="bg-blueHover text-lightText text-center mt-2">
        <p>&copy; {new Date().getFullYear()} Shadilock. All rights reserved.</p>
      </footer>
    </main>
  );
}
