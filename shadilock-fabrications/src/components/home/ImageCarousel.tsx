"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useGalleryStore } from "@/lib/store/useGalleryStore";

interface ImageCarouselProps {
  interval?: number;
  limit?: number; // optional: limit how many images to show
}

export default function ImageCarousel({
  interval = 4000,
  limit = 5,
}: ImageCarouselProps) {
  const { allFiles, refresh } = useGalleryStore();
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  // Shuffle helper
  const shuffle = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

  // Fetch + shuffle images once
  useEffect(() => {
    if (allFiles.length === 0) {
      refresh().then(() => {
        setImages(
          shuffle(useGalleryStore.getState().allFiles.map((f) => f.url)).slice(
            0,
            limit
          )
        );
      });
    } else {
      setImages(shuffle(allFiles.map((f) => f.url)).slice(0, limit));
    }
  }, [allFiles, limit, refresh]);

  // Reset timeouts each slide
  const resetTimeouts = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  useEffect(() => {
    if (images.length === 0) return;

    resetTimeouts();
    setProgress(0);

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + 100 / (interval / 100), 100));
    }, 100);

    return () => resetTimeouts();
  }, [currentIndex, images, interval]);

  const goToPrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-lg mt-10 md:mt-0">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="w-full flex-shrink-0 relative h-64 sm:h-80 md:h-[26rem] lg:h-[28rem] xl:h-[32rem]"
          >
            <Image
              src={img}
              alt={`Slide ${idx + 1}`}
              fill
              sizes="100vw"
              loading={idx === currentIndex ? "eager" : "lazy"}
              priority={idx === currentIndex}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 w-full max-w-xs px-4">
        {images.map((_, idx) => (
          <div
            key={idx}
            className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
          >
            <div
              className={`h-full bg-white transition-all duration-100`}
              style={{ width: idx === currentIndex ? `${progress}%` : "0%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
