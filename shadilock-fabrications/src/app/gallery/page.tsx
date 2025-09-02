"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useDriveStore } from "@/lib/store/useDriveStore";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery() {
  const { files, loading, page, totalFiles, pageSize, fetchFiles } =
    useDriveStore();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const totalPages = Math.ceil(totalFiles / pageSize);

  // --- Initial fetch ---
  useEffect(() => {
    fetchFiles(page, pageSize);
  }, [fetchFiles, page, pageSize]);

  // --- Navigation ---
  const handleNextImage = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null && prev < files.length - 1 ? prev + 1 : prev
    );
  }, [files]);

  const handlePrevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  }, []);

  // --- Keyboard navigation ---
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

  const selectedFile =
    selectedIndex !== null && selectedIndex >= 0 && selectedIndex < files.length
      ? files[selectedIndex]
      : null;

  // --- Pagination helpers ---
  const handlePrevPage = () => {
    if (page > 1) fetchFiles(page - 1, pageSize);
  };

  const handleNextPage = () => {
    if (page < totalPages) fetchFiles(page + 1, pageSize);
  };

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <div className="flex justify-center items-center gap-2 my-6 flex-wrap">
        <button
          onClick={handlePrevPage}
          disabled={page <= 1}
          className="px-3 py-1 bg-lightText border hover:border-lightText border-orange text-orange font-black rounded-full disabled:opacity-50 hover:bg-blueHover hover:text-white transition"
        >
          ‹
        </button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => fetchFiles(p, pageSize)}
            className={`px-3 py-1 rounded-full border border-lightText transition
              ${
                p === page
                  ? "bg-orange text-white"
                  : "hover:bg-blue hover:text-white text-orange"
              }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={page >= totalPages}
          className="px-3 py-1 bg-lightText border hover:border-lightText border-orange text-orange font-black rounded-full disabled:opacity-50 hover:bg-blueHover hover:text-white transition"
        >
          ›
        </button>
      </div>
    );
  };

  return (
    <div className="p-6 min-h-screen ">
      <h1 className="text-3xl mb-6 text-lightText">Gallery</h1>

      {loading && files.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="mt-4 text-lightText">Loading images...</p>
        </div>
      ) : files.length === 0 ? (
        <p className="text-lightText">No files available.</p>
      ) : (
        <>
          {renderPagination()}

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {files.map((file, index) => {
              const updatedDate = file.modifiedTime
                ? new Date(file.modifiedTime).toLocaleDateString()
                : "N/A";

              return (
                <motion.div
                  key={file.id}
                  onClick={() => setSelectedIndex(index)}
                  className="cursor-pointer rounded-lg shadow-lg overflow-hidden bg-blue"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={file.thumbnail}
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
                </motion.div>
              );
            })}
          </div>

          {renderPagination()}
        </>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedFile && (
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
              {/* Close */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-2 right-2 text-white text-3xl font-bold z-50"
              >
                &times;
              </button>

              {/* Prev */}
              {selectedIndex !== null && selectedIndex > 0 && (
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 text-white text-4xl font-bold z-50"
                >
                  ‹
                </button>
              )}

              {/* Next */}
              {selectedIndex !== null && selectedIndex < files.length - 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 text-white text-4xl font-bold z-50"
                >
                  ›
                </button>
              )}

              <div className="relative w-full max-h-[80vh] h-[70vh]">
                <Image
                  src={selectedFile.thumbnail}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
