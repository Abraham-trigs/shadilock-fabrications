"use client";

import { useEffect, useRef, useState } from "react";

interface ImageCarouselProps {
  images: string[];
  interval?: number; // milliseconds
}

export default function ImageCarousel({
  images,
  interval = 3000,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => resetTimeout();
  }, [currentIndex, images.length, interval]);

  return (
    <div className="w-full flex justify-center items-center overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Slide ${idx + 1}`}
            className="
              w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[28rem] 2xl:w-[32rem]
              h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 2xl:h-80
              object-cover rounded-xl mx-2
              flex-shrink-0
            "
          />
        ))}
      </div>
    </div>
  );
}
