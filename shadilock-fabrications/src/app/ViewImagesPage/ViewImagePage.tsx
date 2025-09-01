"use client";

import React from "react";
import { useDriveImages } from "@/lib/hooks/useDriveImages";

export default function ViewImagesPage() {
  const { images, loading } = useDriveImages();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Images</h1>
      {loading ? (
        <p>Loading...</p>
      ) : images.length === 0 ? (
        <p>No images found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="border p-2 rounded shadow dark:border-gray-600"
            >
              <img
                src={img.url ?? ""}
                alt={img.name ?? "image"}
                className="w-full h-40 object-cover rounded"
              />
              <p className="mt-2 text-center">{img.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
