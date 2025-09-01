// app/manage-image/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  url: string;
}

export default function ManageImage() {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const loadFiles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/google");
      const data = await res.json();
      setFiles(data.files || []);
    } catch (err) {
      console.error(err);
      setFiles([]);
      showToast("Failed to load files!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const uploadFile = async () => {
    if (!selectedFile) {
      showToast("Please select a file to upload!");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/google");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percent);
      }
    };

    xhr.onload = () => {
      setUploading(false);
      setUploadProgress(0);
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        if (data.success) {
          setSelectedFile(null);
          loadFiles();
          showToast("File uploaded successfully!");
        } else {
          showToast(data.error || "Upload failed!");
        }
      } else {
        showToast("Upload failed due to network error!");
      }
    };

    xhr.onerror = () => {
      setUploading(false);
      setUploadProgress(0);
      showToast("Upload failed due to network error!");
    };

    xhr.send(formData);
  };

  const deleteFile = async (id: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/google?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) loadFiles();
      else showToast(data.error || "Delete failed!");
    } catch (err) {
      console.error(err);
      showToast("Delete failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-darkBg">
      <h1 className="text-3xl mb-6 text-lightText font-bold">Manage Images</h1>

      {/* Upload Section */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center relative">
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          className="text-lightText"
        />
        <div className="flex flex-col items-start">
          <button
            onClick={uploadFile}
            disabled={uploading}
            className="px-4 py-2 rounded transition-colors duration-200 bg-orange hover:bg-orangeHover text-lightText disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

          {/* Upload progress bar */}
          {uploading && (
            <div className="w-full mt-2 h-2 rounded bg-gray-700">
              <div
                className="h-2 rounded transition-all bg-orange"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          {/* Toast */}
          {toast && (
            <div className="mt-2 px-4 py-2 rounded shadow-lg animate-slideDown bg-blueHover text-lightText">
              {toast}
            </div>
          )}
        </div>
      </div>

      {/* Image Grid */}
      {loading ? (
        <p className="text-lightText">Loading...</p>
      ) : files.length === 0 ? (
        <p className="text-lightText">No images found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform flex flex-col bg-blue"
            >
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-lightText">
                    {file.name}
                  </h2>
                  <p className="text-lightText text-sm">
                    Type: {file.mimeType}
                  </p>
                  <p className="text-lightText text-xs">
                    Updated: {new Date(file.modifiedTime).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteFile(file.id)}
                  className="mt-4 px-3 py-1 rounded font-semibold text-white transition-colors bg-orange hover:bg-orangeHover"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toast Animation */}
      <style jsx>{`
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
