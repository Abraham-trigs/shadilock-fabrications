"use client";

import { useEffect } from "react";
import { useDriveStore } from "@/lib/store/useDriveStore";

import Navbar from "@/components/layout/Navbar";
import ResponsiveBackground from "@/components/layout/ResponsiveBackground";
import HeroContent from "@/components/home/HeroContent";
import InfoCards from "@/components/home/InfoCards";
import ImageCarousel from "@/components/home/ImageCarousel";
import OurServices from "@/components/home/OurServices";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const desktopBg = "/hero-desktop.webp";
const laptopBg = "/hero-Tablet.webp";
const mobileBg = "/hero-Mobile.webp";

const carouselImages = [
  "/img1.avif",
  "/img2.avif",
  "/img3.avif",
  "/img4.avif",
  "/img5.avif",
];

export default function HomePageClient() {
  const fetchFiles = useDriveStore((state) => state.fetchFiles);

  // 🔥 Fetch first page of Drive images on homepage load
  useEffect(() => {
    fetchFiles(1, 20);
  }, [fetchFiles]);

  return (
    <main className="relative w-full text-lightText">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col">
        <ResponsiveBackground
          desktop={desktopBg}
          laptop={laptopBg}
          mobile={mobileBg}
        />

        {/* Wrapper */}
        <div className="relative z-10 px-4 md:px-12 lg:px-20 py-12 mt-10">
          {/* Mobile Layout */}
          <div className="flex flex-col gap-8 lg:hidden">
            <HeroContent />
            <ImageCarousel images={carouselImages} interval={4000} />
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex flex-row items-start gap-6">
            <div className="w-full lg:w-2/3">
              <HeroContent />
            </div>
            <div className="w-full lg:w-1/3 flex justify-center">
              <ImageCarousel images={carouselImages} interval={4000} />
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
