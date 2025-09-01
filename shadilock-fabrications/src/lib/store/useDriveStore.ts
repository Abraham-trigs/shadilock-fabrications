import { create } from "zustand";

export interface DriveFile {
  id: string;
  name: string;
  mimeType?: string;
  modifiedTime?: string;
  url: string;
  thumbnailLink?: string; // optional thumbnail for grid view
}

interface DriveState {
  files: DriveFile[];
  loading: boolean;
  error?: string;
  fetchFiles: () => Promise<void>;
  uploadFile: (file: File) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
  renameFile: (id: string, newName: string) => Promise<void>;
}

export const useDriveStore = create<DriveState>((set, get) => ({
  files: [],
  loading: false,
  error: undefined,

  fetchFiles: async () => {
    set({ loading: true, error: undefined });
    try {
      const res = await fetch("/api/google");
      if (!res.ok) throw new Error("Failed to fetch files");
      const data = await res.json();
      const files: DriveFile[] = (data.files || []).map((f: any) => ({
        id: f.id,
        name: f.name,
        mimeType: f.mimeType,
        modifiedTime: f.modifiedTime,
        url: f.url,
        thumbnailLink: f.thumbnailLink || `https://drive.google.com/uc?export=view&id=${f.id}`,
      }));
      set({ files });
    } catch (err: any) {
      set({ error: err.message || "Unknown error" });
      console.error("Drive fetchFiles error:", err);
    } finally {
      set({ loading: false });
    }
  },

  uploadFile: async (file: File) => {
    set({ loading: true });
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/google", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      await get().fetchFiles();
    } catch (err: any) {
      console.error("Drive uploadFile error:", err);
    } finally {
      set({ loading: false });
    }
  },

  deleteFile: async (id: string) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/google/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await get().fetchFiles();
    } catch (err: any) {
      console.error("Drive deleteFile error:", err);
    } finally {
      set({ loading: false });
    }
  },

  renameFile: async (id: string, newName: string) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/google/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      if (!res.ok) throw new Error("Rename failed");
      await get().fetchFiles();
    } catch (err: any) {
      console.error("Drive renameFile error:", err);
    } finally {
      set({ loading: false });
    }
  },
}));
