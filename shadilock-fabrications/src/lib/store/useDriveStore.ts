import { create } from "zustand";

export interface DriveFile {
  id: string;
  name: string;
  mimeType?: string;
  modifiedTime?: string;
  url: string;
  thumbnailLink?: string;
  webContentLink?: string; // ADDED: This property is needed for the image fallback
}

interface DriveState {
  files: DriveFile[];
  loading: boolean;
  error?: string;
  success?: string;
  page: number;
  totalFiles: number;
  pageSize: number;

  fetchFiles: (page?: number, pageSize?: number) => Promise<void>;
  uploadFile: (file: File) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
  renameFile: (id: string, newName: string) => Promise<void>;
  clearMessages: () => void;
}

export const useDriveStore = create<DriveState>((set, get) => ({
  files: [],
  loading: false,
  error: undefined,
  success: undefined,
  page: 1,
  totalFiles: 0,
  pageSize: 20, // default 20 images per page

  clearMessages: () => set({ error: undefined, success: undefined }),

  fetchFiles: async (page = 1, pageSize = 20) => {
    set({ loading: true, error: undefined, success: undefined });
    try {
      const res = await fetch(`/api/google?page=${page}&pageSize=${pageSize}`);
      if (!res.ok) throw new Error("Failed to fetch files");

      const data = await res.json();
      set({
        files: data.files || [],
        page,
        pageSize,
        totalFiles: data.totalFiles || 0,
      });
    } catch (err: any) {
      set({ error: err.message || "Unknown error" });
      console.error("Drive fetchFiles error:", err);
    } finally {
      set({ loading: false });
    }
  },

  uploadFile: async (file: File) => {
    set({ loading: true, error: undefined, success: undefined });
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/google", { method: "POST", body: formData });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.details || "Upload failed");
      }

      // Refresh current page after upload
      await get().fetchFiles(get().page, get().pageSize);
      set({ success: `${file.name} uploaded successfully!` });
    } catch (err: any) {
      set({ error: err.message || "Upload error" });
      console.error("Drive uploadFile error:", err);
    } finally {
      set({ loading: false });
    }
  },

  deleteFile: async (id: string) => {
    set({ loading: true, error: undefined, success: undefined });
    try {
      const res = await fetch(`/api/google/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.details || "Delete failed");
      }

      // Refresh current page after deletion
      await get().fetchFiles(get().page, get().pageSize);
      set({ success: `File deleted successfully!` });
    } catch (err: any) {
      set({ error: err.message || "Delete error" });
      console.error("Drive deleteFile error:", err);
    } finally {
      set({ loading: false });
    }
  },

  renameFile: async (id: string, newName: string) => {
    set({ loading: true, error: undefined, success: undefined });
    try {
      const res = await fetch(`/api/google/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.details || "Rename failed");
      }

      // Refresh current page after rename
      await get().fetchFiles(get().page, get().pageSize);
      set({ success: `File renamed to "${newName}"` });
    } catch (err: any) {
      set({ error: err.message || "Rename error" });
      console.error("Drive renameFile error:", err);
    } finally {
      set({ loading: false });
    }
  },
}));
