"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useDriveStore, DriveFile } from "@/lib/store/useDriveStore";

const colors = {
  blue: "#080023",
  blueHover: "#15005c",
  lightText: "#f4f4f4",
  darkBg: "#1b1b1c",
  success: "#4ade80",
  error: "#f87171",
  info: "#60a5fa",
};

export default function Manage() {
  const { files, loading, fetchFiles, uploadFile, deleteFile, renameFile } =
    useDriveStore();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [editingFile, setEditingFile] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [newFileName, setNewFileName] = useState("");
  const [toasts, setToasts] = useState<
    { id: number; type: "success" | "error" | "info"; message: string }[]
  >([]);

  // --- Toast helpers ---
  const addToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      4000
    );
  };

  // --- Initial fetch ---
  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // --- File upload ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files?.[0] ?? null);

  const handleUpload = async () => {
    if (!file) return;
    try {
      await uploadFile(file);
      addToast("File uploaded successfully!", "success");
      setFile(null);
      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (err) {
      addToast("Upload failed", "error");
    }
  };

  // --- File delete ---
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    try {
      await deleteFile(id);
      addToast("File deleted successfully!", "success");
    } catch (err) {
      addToast("Delete failed", "error");
    }
  };

  // --- File rename ---
  const handleStartEdit = (file: DriveFile) => {
    setEditingFile({ id: file.id, name: file.name });
    setNewFileName(file.name);
  };

  const handleCancelEdit = () => {
    setEditingFile(null);
    setNewFileName("");
  };

  const handleSaveEdit = async () => {
    if (!editingFile || !newFileName.trim()) return;
    try {
      await renameFile(editingFile.id, newFileName.trim());
      addToast("File renamed successfully!", "success");
      setEditingFile(null);
      setNewFileName("");
    } catch (err) {
      addToast("Rename failed", "error");
    }
  };

  // --- Lightbox navigation ---
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

      {/* Toasts */}
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded shadow-lg text-white transform transition-all duration-300 ease-in-out max-w-sm`}
            style={{
              backgroundColor:
                toast.type === "success"
                  ? colors.success
                  : toast.type === "error"
                  ? colors.error
                  : colors.info,
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>

      {/* Upload section */}
      <div
        className="mb-8 p-6 rounded-lg"
        style={{ backgroundColor: colors.blue }}
      >
        <h2 className="text-xl mb-4" style={{ color: colors.lightText }}>
          Upload New Image
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:rounded"
          />
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {file && (
          <p className="mt-2 text-sm" style={{ color: colors.lightText }}>
            Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
      </div>

      {/* Loading spinner */}
      {loading && files.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="mt-4" style={{ color: colors.lightText }}>
            Loading images...
          </p>
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl" style={{ color: colors.lightText }}>
            No images available.
          </p>
          <p className="mt-2 text-gray-400">
            Upload some images to get started!
          </p>
        </div>
      ) : (
        <>
          {/* Files Grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {files.map((file, index) => (
              <div
                key={file.id}
                className="rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl relative group"
                style={{ backgroundColor: colors.blue }}
              >
                <div
                  className="relative w-full h-48 cursor-pointer"
                  onClick={() => setSelectedIndex(index)}
                >
                  <Image
                    src={file.thumbnailLink || file.url}
                    alt={file.name}
                    fill
                    className="object-cover rounded-t-lg transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,25vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-t-lg" />
                </div>

                <div className="p-4">
                  <h2
                    className="text-lg font-semibold truncate mb-1"
                    style={{ color: colors.lightText }}
                    title={file.name}
                  >
                    {file.name}
                  </h2>
                  {file.mimeType && (
                    <p
                      style={{ color: colors.lightText, fontSize: "0.85rem" }}
                      className="opacity-75"
                    >
                      {file.mimeType.replace("image/", "").toUpperCase()}
                    </p>
                  )}
                  {file.modifiedTime && (
                    <p
                      style={{ color: colors.lightText, fontSize: "0.75rem" }}
                      className="opacity-60 mt-1"
                    >
                      {new Date(file.modifiedTime).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Action buttons */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartEdit(file);
                    }}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors shadow-lg"
                    title="Rename file"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(file.id);
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors shadow-lg"
                    title="Delete file"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Lightbox */}
      {selectedFile && (
        <div
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
        >
          <div
            className="relative max-w-6xl w-full px-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute -top-12 right-4 text-white text-3xl font-bold z-50 hover:text-gray-300 transition-colors"
              title="Close (Esc)"
            >
              ✕
            </button>

            {selectedIndex! > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold z-50 hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
                title="Previous (←)"
              >
                ‹
              </button>
            )}
            {selectedIndex! < files.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold z-50 hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
                title="Next (→)"
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
            <div className="mt-4 text-center max-w-2xl">
              <p
                className="text-lg font-semibold"
                style={{ color: colors.lightText }}
              >
                {selectedFile.name}
              </p>
              <p className="text-sm text-gray-300 mt-1">
                {selectedIndex! + 1} of {files.length}
                {selectedFile.mimeType && ` • ${selectedFile.mimeType}`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
