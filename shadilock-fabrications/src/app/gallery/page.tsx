"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useGalleryStore } from "@/lib/store/useGalleryStore";

export default function GalleryPage() {
  const {
    allFiles,
    loading,
    refresh,
    selectedIndex,
    openLightbox,
    closeLightbox,
    nextImage,
    prevImage,
  } = useGalleryStore();

  // Only fetch if store is empty
  useEffect(() => {
    if (allFiles.length === 0) {
      refresh();
    }
  }, [allFiles.length, refresh]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, nextImage, prevImage, closeLightbox]);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl mb-6 text-lightText">Gallery</h1>

      {loading && allFiles.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="mt-4 text-lightText">Loading images...</p>
        </div>
      ) : allFiles.length === 0 ? (
        <p className="text-lightText">No images available.</p>
      ) : (
        <>
          {/* Gallery Grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {allFiles.map((file, index) => (
              <motion.div
                key={file.name}
                onClick={() => openLightbox(index)}
                className="cursor-pointer rounded-lg shadow-lg overflow-hidden bg-blue"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative w-full h-48">
                  <Image
                    src={file.url}
                    alt={file.name}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    unoptimized
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-lightText">
                    {file.name}
                  </h2>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && allFiles[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
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
              {/* Close button (top-right corner) */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
              >
                &times;
              </button>

              {/* Prev button (left-center with circular background) */}
              {selectedIndex > 0 && (
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-3 flex items-center justify-center"
                >
                  <span className="text-white text-2xl">‹</span>
                </button>
              )}

              {/* Next button (right-center with circular background) */}
              {selectedIndex < allFiles.length - 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-3 flex items-center justify-center"
                >
                  <span className="text-white text-2xl">›</span>
                </button>
              )}

              {/* Image with swipe support */}
              <motion.div
                className="relative w-full max-h-[80vh] h-[70vh]"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 100) {
                    prevImage(); // swipe right
                  } else if (info.offset.x < -100) {
                    nextImage(); // swipe left
                  }
                }}
              >
                <Image
                  src={allFiles[selectedIndex].url}
                  alt={allFiles[selectedIndex].name}
                  fill
                  className="object-contain rounded-lg select-none"
                  sizes="100vw"
                  unoptimized
                />
              </motion.div>

              {/* Caption */}
              <p className="mt-4 text-center text-lg text-lightText">
                {allFiles[selectedIndex]?.name}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
