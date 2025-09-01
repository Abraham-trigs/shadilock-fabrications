"use client";

import React from "react";

interface Image {
  id: string;
  name: string;
  url?: string;
}

interface State {
  images: Image[];
  loading: boolean;
  file: File | null;
}

export default class ManageImagesPage extends React.Component<{}, State> {
  state: State = {
    images: [],
    loading: false,
    file: null,
  };

  componentDidMount() {
    this.fetchImages();
  }

  // --- Fetch Images ---
  fetchImages = async () => {
    this.setState({ loading: true });
    try {
      const res = await fetch("/api/google");
      if (!res.ok) throw new Error("Failed to fetch images");
      const data = await res.json();
      this.setState({ images: data.files || [] });
    } catch (err) {
      console.error("Error fetching images:", err);
    } finally {
      this.setState({ loading: false });
    }
  };

  // --- File input handler ---
  handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    this.setState({ file });
  };

  // --- Upload File ---
  handleUpload = async () => {
    const { file } = this.state;
    if (!file) return;

    this.setState({ loading: true });
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/google", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      await this.fetchImages(); // refresh list
      this.setState({ file: null });
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      this.setState({ loading: false });
    }
  };

  // --- Delete Image ---
  handleDelete = async (id: string) => {
    this.setState({ loading: true });
    try {
      const res = await fetch(`/api/google?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      await this.fetchImages(); // refresh list
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { images, loading, file } = this.state;

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Images</h1>

        {/* Upload */}
        <div className="mb-6">
          <input
            type="file"
            onChange={this.handleFileChange}
            className="block w-full text-sm text-gray-500 
                       file:mr-4 file:py-2 file:px-4 file:border-0 
                       file:text-sm file:font-semibold file:bg-blue-50 
                       file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            onClick={this.handleUpload}
            disabled={!file || loading}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded 
                       hover:bg-green-600 disabled:opacity-50"
          >
            Upload
          </button>
        </div>

        {/* Images Grid */}
        {loading ? (
          <p>Loading...</p>
        ) : images.length === 0 ? (
          <p>No images found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="border p-2 rounded shadow dark:border-gray-600 relative"
              >
                <img
                  src={img.url ?? ""}
                  alt={img.name ?? "image"}
                  className="w-full h-40 object-cover rounded"
                />
                <button
                  onClick={() => this.handleDelete(img.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <p className="mt-2 text-center">{img.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
