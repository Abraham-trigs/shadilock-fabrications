"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      {[
        { src: mobile, type: "mobile" },
        { src: laptop, type: "laptop" },
        { src: desktop, type: "desktop" },
      ].map((bg) => (
        <Image
          key={bg.type}
          src={bg.src}
          alt={`${bg.type} background`}
          fill
          sizes="100vw" // tells Next.js it should cover full viewport width
          priority={screen === bg.type} // only active screen loads eagerly
          loading={screen === bg.type ? "eager" : "lazy"} // others lazy load
          className={`absolute top-0 left-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ${
            screen === bg.type ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
        />
      ))}
    </div>
  );
}
