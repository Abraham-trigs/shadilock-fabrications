"use client";

import LogoStrip from "@/components/home/LogoSTrip";
import Link from "next/link";

export default function HeroContent() {
  return (
    <div className="flex flex-col items-start px-6 md:px-12 lg:px-16 w-full max-w-3xl">
      {/* Logo strip */}
      <LogoStrip logoSrc="/logo.webp" />

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 mt-8 text-orange">
        Shadilock Fabrication
      </h1>

      {/* Paragraph */}
      <p className="text-lightText max-w-xl mb-6 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
        Your trusted partner in high-quality locksmith services. Secure,
        reliable, and efficient solutions tailored for your needs.
      </p>

      {/* Button */}
      <Link href="/contact">
        <button className="flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 bg-lightText text-blue font-semibold rounded-lg shadow-md hover:bg-orangeHover transition-transform transform hover:scale-105 active:scale-95 text-sm sm:text-base md:text-lg lg:text-xl">
          Request a Service
          {/* Detailed 3D CSS Side Helmet */}
          <span className="relative w-8 h-5">
            {/* Dome */}
            <span className="absolute top-0 left-0 w-8 h-5 rounded-t-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 border-b-2 border-yellow-700"></span>

            {/* Visor */}
            <span className="absolute top-1 left-7 w-2.5 h-1 rounded-r-full bg-gradient-to-br from-yellow-500 to-yellow-600"></span>

            {/* Front ridge */}
            <span className="absolute top-1 left-0 w-6 h-0.5 rounded-full bg-yellow-700"></span>

            {/* Strap */}
            <span className="absolute bottom-0 left-1.5 w-2 h-1.5 bg-yellow-800 rounded-sm rotate-12 origin-top-left"></span>

            {/* Highlight curve */}
            <span className="absolute top-0 left-1 w-6 h-3 rounded-t-full bg-yellow-200 opacity-20"></span>

            {/* Vent lines */}
            <span className="absolute top-1 left-1 w-5 h-0.5 bg-yellow-600 opacity-50 rounded-full"></span>
            <span className="absolute top-1.5 left-1 w-5 h-0.5 bg-yellow-600 opacity-50 rounded-full"></span>
          </span>
        </button>
      </Link>
    </div>
  );
}
