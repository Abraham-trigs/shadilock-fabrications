"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface DriveFile {
  id: string;
  name: string;
  mimeType?: string;
  modifiedTime?: string;
  url: string; // now guaranteed direct image link
}

const colors = {
  blue: "#080023",
  blueHover: "#15005c",
  lightText: "#f4f4f4",
  darkBg: "#1b1b1c",
};

export default function Manage() {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // Fetch images
  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/google");
      const data = await res.json();
      setFiles(data.files || []);
    } catch (err) {
      console.error("Error fetching images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/google", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      setFile(null);
      await fetchImages();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/google?fileId=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await fetchImages();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Lightbox navigation
  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null && prev < files.length - 1 ? prev + 1 : prev
    );
  }, [files]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  }, []);

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
        Manage Images
      </h1>

      {/* Upload */}
      <div className="mb-6">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Upload
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <p style={{ color: colors.lightText }}>Loading...</p>
      ) : files.length === 0 ? (
        <p style={{ color: colors.lightText }}>No images available.</p>
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
                  src={file.url}
                  alt={file.name}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,25vw"
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
                {file.mimeType && (
                  <p style={{ color: colors.lightText, fontSize: "0.85rem" }}>
                    Type: {file.mimeType}
                  </p>
                )}
                {file.modifiedTime && (
                  <p style={{ color: colors.lightText, fontSize: "0.75rem" }}>
                    Updated: {new Date(file.modifiedTime).toLocaleDateString()}
                  </p>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(file.id);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
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
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full px-4 flex flex-col items-center"
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-2 right-2 text-white text-3xl font-bold z-50"
            >
              &times;
            </button>
            {selectedIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 text-white text-4xl font-bold z-50"
              >
                ‹
              </button>
            )}
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
