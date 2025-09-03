"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery() {
  const pageSize = 8;
  const [files, setFiles] = useState<string[]>([]);
  const [visibleFiles, setVisibleFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // --- Fetch files from API ---
  useEffect(() => {
    setLoading(true);
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.files || []);
        setVisibleFiles(data.files.slice(0, pageSize));
      })
      .finally(() => setLoading(false));
  }, []);

  // --- Infinite scroll logic ---
  const loadMore = useCallback(() => {
    setVisibleFiles((prev) => {
      const nextFiles = files.slice(prev.length, prev.length + pageSize);
      return [...prev, ...nextFiles];
    });
  }, [files]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "100px" }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  // --- Lightbox navigation ---
  const handleNextImage = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null && prev < visibleFiles.length - 1 ? prev + 1 : prev
    );
  }, [visibleFiles]);

  const handlePrevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNextImage, handlePrevImage]);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl mb-6 text-lightText">Gallery</h1>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="mt-4 text-lightText">Loading images...</p>
        </div>
      ) : visibleFiles.length === 0 ? (
        <p className="text-lightText">No images available.</p>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {visibleFiles.map((file, index) => (
              <motion.div
                key={file}
                onClick={() => setSelectedIndex(index)}
                className="cursor-pointer rounded-lg shadow-lg overflow-hidden bg-blue"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative w-full h-48">
                  <Image
                    src={`/gallery/${file}`}
                    alt={file}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    unoptimized
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-lightText">
                    {file}
                  </h2>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sentinel for infinite scroll */}
          <div ref={observerRef} className="h-10" />

          {visibleFiles.length < files.length && (
            <p className="text-center mt-4 text-lightText">
              Loading more images...
            </p>
          )}
        </>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && visibleFiles[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          >
            <motion.div
              className="relative max-w-5xl w-full px-4 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-2 right-2 text-white text-3xl font-bold z-50"
              >
                &times;
              </button>

              {selectedIndex > 0 && (
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 text-white text-4xl font-bold z-50"
                >
                  ‹
                </button>
              )}

              {selectedIndex < visibleFiles.length - 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 text-white text-4xl font-bold z-50"
                >
                  ›
                </button>
              )}

              <div className="relative w-full max-h-[80vh] h-[70vh]">
                <Image
                  src={`/gallery/${visibleFiles[selectedIndex]}`}
                  alt={visibleFiles[selectedIndex]}
                  fill
                  className="object-contain rounded-lg"
                  sizes="100vw"
                  unoptimized
                />
              </div>
              <p className="mt-4 text-center text-lg text-lightText">
                {visibleFiles[selectedIndex]}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
