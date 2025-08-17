"use client";

import LogoStrip from "@/components/home/LogoSTrip";

export default function HeroContent() {
  return (
    <div className="flex flex-col items-start px-6 md:px-12 lg:px-16 w-full max-w-3xl">
      {/* Logo strip */}
      <LogoStrip logoSrc="/logo.webp" />

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 mt-8 text-orange">
        Shadilock Fabication
      </h1>

      {/* Paragraph */}
      <p className="text-lightText max-w-xl mb-6 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
        Your trusted partner in high-quality locksmith services. Secure,
        reliable, and efficient solutions tailored for your needs.
      </p>

      {/* Button */}
      <button className="px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 bg-lightText text-blue font-semibold rounded-lg shadow-md hover:bg-orangeHover transition-transform transform hover:scale-105 active:scale-95 text-sm sm:text-base md:text-lg lg:text-xl">
        Request a Service
      </button>
    </div>
  );
}
