"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useDriveStore } from "@/lib/store/useDriveStore";

export default function Gallery() {
  const { files, loading, fetchFiles } = useDriveStore();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // --- Initial fetch ---
  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // --- Lightbox navigation ---
  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null && prev < files.length - 1 ? prev + 1 : prev
    );
  }, [files]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  }, []);

  // --- Keyboard navigation ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  const selectedFile =
    selectedIndex !== null && selectedIndex >= 0 && selectedIndex < files.length
      ? files[selectedIndex]
      : null;

  return (
    <div className="p-6 min-h-screen bg-darkBg">
      <h1 className="text-3xl mb-6 text-lightText">Gallery</h1>

      {loading && files.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="mt-4 text-lightText">Loading images...</p>
        </div>
      ) : files.length === 0 ? (
        <p className="text-lightText">No files available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {files.map((file, index) => {
            const updatedDate = file.modifiedTime
              ? new Date(file.modifiedTime).toLocaleDateString()
              : "N/A";

            return (
              <div
                key={file.id}
                onClick={() => setSelectedIndex(index)}
                className="cursor-pointer rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 bg-blue"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={file.thumbnailLink || file.url}
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
                  <p className="text-lightText text-sm">
                    Type: {file.mimeType || "Unknown"}
                  </p>
                  <p className="text-lightText text-xs">
                    Updated: {updatedDate}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {selectedFile && (
        <div
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        >
          <div
            className="relative max-w-5xl w-full px-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-2 right-2 text-white text-3xl font-bold z-50"
            >
              &times;
            </button>

            {/* Prev button */}
            {selectedIndex !== null && selectedIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 text-white text-4xl font-bold z-50"
              >
                ‹
              </button>
            )}

            {/* Next button */}
            {selectedIndex !== null && selectedIndex < files.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 text-white text-4xl font-bold z-50"
              >
                ›
              </button>
            )}

            <div className="relative w-full max-h-[80vh] h-[70vh]">
              <Image
                src={selectedFile.url}
                alt={selectedFile.name}
                fill
                className="object-contain rounded-lg"
                sizes="100vw"
                unoptimized
              />
            </div>
            <p className="mt-4 text-center text-lg text-lightText">
              {selectedFile.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
