"use client";
import Navbar from "@/components/layout/Navbar";
import ResponsiveBackground from "@/components/layout/ResponsiveBackground";
import HeroContent from "@/components/home/HeroContent";
import InfoCards from "@/components/home/InfoCards";
import ImageCarousel from "@/components/home/ImageCarousel";

const desktopBg = "./hero-desktop.webp";
const laptopBg = "./hero-Tablet.webp";
const mobileBg = "./hero-Mobile.webp";

const carouselImages = [
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg",
  "/img4.jpg",
  "/img5.jpg",
];

export default function HomePage() {
  return (
    <main className="relative w-full text-lightText">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen">
        {/* Background */}
        <ResponsiveBackground
          desktop={desktopBg}
          laptop={laptopBg}
          mobile={mobileBg}
        />

        {/* Hero Content + Carousel */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 px-4 md:px-12 lg:px-20">
          <HeroContent />
          <ImageCarousel images={carouselImages} />
        </div>
      </section>

      {/* Info Cards */}
      <InfoCards />

      {/* Footer */}
      <footer className="bg-blueHover text-lightText text-center py-6 mt-12">
        <p>&copy; {new Date().getFullYear()} Shadilock. All rights reserved.</p>
      </footer>
    </main>
  );
}
