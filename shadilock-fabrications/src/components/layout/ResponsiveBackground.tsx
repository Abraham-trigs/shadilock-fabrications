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
      {/* Background Images */}
      {[
        { src: desktop, type: "desktop" },
        { src: laptop, type: "laptop" },
        { src: mobile, type: "mobile" },
      ].map((bg) => (
        <img
          key={bg.type}
          src={bg.src}
          alt={`${bg.type} background`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            screen === bg.type ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
        />
      ))}

      {/* Overlay Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-lightText px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold animate-fadeIn">
          Welcome to Shadilock
        </h1>
      </div>
    </div>
  );
}
