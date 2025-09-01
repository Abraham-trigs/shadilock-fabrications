"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useDriveStore, DriveFile } from "@/lib/store/useDriveStore";

const colors = {
  blue: "#080023",
  blueHover: "#15005c",
  lightText: "#f4f4f4",
  darkBg: "#1b1b1c",
};

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
    <div
      className="p-6"
      style={{ backgroundColor: colors.darkBg, minHeight: "100vh" }}
    >
      <h1 className="text-3xl mb-6" style={{ color: colors.lightText }}>
        Gallery
      </h1>

      {loading && files.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="mt-4" style={{ color: colors.lightText }}>
            Loading images...
          </p>
        </div>
      ) : files.length === 0 ? (
        <p style={{ color: colors.lightText }}>No files available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {files.map((file, index) => (
            <div
              key={file.id}
              onClick={() => setSelectedIndex(index)}
              className="cursor-pointer rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              style={{ backgroundColor: colors.blue }}
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
                <h2
                  className="text-lg font-semibold"
                  style={{ color: colors.lightText }}
                >
                  {file.name}
                </h2>
                <p style={{ color: colors.lightText, fontSize: "0.85rem" }}>
                  Type: {file.mimeType}
                </p>
                <p style={{ color: colors.lightText, fontSize: "0.75rem" }}>
                  Updated: {new Date(file.modifiedTime).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
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
            {selectedIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 text-white text-4xl font-bold z-50"
              >
                ‹
              </button>
            )}

            {/* Next button */}
            {selectedIndex < files.length - 1 && (
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
            <p
              className="mt-4 text-center text-lg"
              style={{ color: colors.lightText }}
            >
              {selectedFile.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
