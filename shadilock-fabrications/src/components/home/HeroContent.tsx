"use client";

import LogoStrip from "@/components/home/LogoSTrip";

export default function HeroContent() {
  return (
    <div className="absolute top-60 left-0 z-10 flex flex-col items-start px-6 md:px-12 lg:px-20 w-full max-w-5xl">
      {/* Logo strip */}
      <LogoStrip logoSrc="/logo.webp" />

      {/* Heading */}
      <h1 className="text-5xl text-orange sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 mt-12">
        Shadilock Fabication
      </h1>

      {/* Paragraph */}
      <p className="text-lightText max-w-xl mb-6 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
        Your trusted partner in high-quality locksmith services. Secure,
        reliable, and efficient solutions tailored for your needs.
      </p>

      {/* Button */}
      <button className="px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 bg-orange text-blue font-semibold rounded-lg shadow-md hover:bg-orangeHover transition-transform transform hover:scale-105 active:scale-95 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
        Request a Service
      </button>
    </div>
  );
}
