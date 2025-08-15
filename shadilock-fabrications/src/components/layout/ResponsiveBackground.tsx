"use client";
import { useState, useEffect } from "react";

interface ResponsiveBackgroundProps {
  desktop: string;
  laptop: string;
  mobile: string;
}

export default function ResponsiveBackground({
  desktop,
  laptop,
  mobile,
}: ResponsiveBackgroundProps) {
  const [screen, setScreen] = useState<"mobile" | "laptop" | "desktop">(
    "mobile"
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setScreen("desktop");
      else if (width >= 768) setScreen("laptop");
      else setScreen("mobile");
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Desktop Image */}
      <img
        src={desktop}
        alt="desktop background"
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
          screen === "desktop" ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Laptop Image */}
      <img
        src={laptop}
        alt="laptop background"
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
          screen === "laptop" ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Mobile Image */}
      <img
        src={mobile}
        alt="mobile background"
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
          screen === "mobile" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Optional overlay content */}
      <div className="relative z-10 flex items-center justify-center h-full text-lightText px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
          Welcome to Shadilock
        </h1>
      </div>
    </div>
  );
}
