"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  url: string;
}

const colors = {
  blue: "#080023",
  blueHover: "#15005c",
  orange: "#ff7800",
  orangeHover: "#8a4100",
  lightText: "#f4f4f4",
  darkBg: "#1b1b1c",
};

export default function Gallery() {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewFile, setPreviewFile] = useState<DriveFile | null>(null);

  // Fetch files from API
  const loadFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/google");
      const data = await res.json();
      setFiles(data.files || []);
    } catch (err) {
      console.error("Failed to load files:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div
      className="p-6"
      style={{ backgroundColor: colors.darkBg, minHeight: "100vh" }}
    >
      <h1 className="text-3xl mb-6" style={{ color: colors.lightText }}>
        Gallery
      </h1>

      {loading ? (
        <p style={{ color: colors.lightText }}>Loading...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {files.map((file) => (
            <div
              key={file.id}
              onClick={() => setPreviewFile(file)}
              className="cursor-pointer rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              style={{ backgroundColor: colors.blue }}
            >
              <div className="relative w-full h-48">
                <Image
                  src={file.url}
                  alt={file.name}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 50vw,
                         25vw"
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

      {/* Lightbox / Modal */}
      {previewFile && (
        <div
          onClick={() => setPreviewFile(null)}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        >
          <div
            className="relative max-w-5xl w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewFile(null)}
              className="absolute top-2 right-2 text-white text-3xl font-bold z-50"
            >
              &times;
            </button>
            <div className="relative w-full max-h-[80vh] h-[70vh]">
              <Image
                src={previewFile.url}
                alt={previewFile.name}
                fill
                className="object-contain rounded-lg"
                sizes="100vw"
              />
            </div>
            <p
              className="mt-4 text-center text-lg"
              style={{ color: colors.lightText }}
            >
              {previewFile.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
