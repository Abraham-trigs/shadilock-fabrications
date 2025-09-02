"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DriveFile {
  id: string;
  name: string;
  mimeType?: string;
  modifiedTime?: string;
  url: string;
  thumbnailLink?: string;
}

interface DriveState {
  files: DriveFile[];
  totalFiles: number;
  page: number;
  pageSize: number;
  loading: boolean;
  error?: string | null;
  success?: string | null;
  fetchFiles: (page?: number, pageSize?: number) => Promise<void>;
  uploadFile: (file: File) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
  renameFile: (id: string, newName: string) => Promise<void>;
  clearMessages: () => void;
}

export const useDriveStore = create<DriveState>()(
  persist(
    (set, get) => ({
      files: [],
      totalFiles: 0,
      page: 1,
      pageSize: 20,
      loading: false,
      error: null,
      success: null,

      fetchFiles: async (page = 1, pageSize = 20) => {
        set({ loading: true, error: null, success: null });
        try {
          const res = await fetch(`/api/google?page=${page}&pageSize=${pageSize}`);
          if (!res.ok) throw new Error("Failed to fetch files");

          const data = await res.json();
          set({
            files: data.files,
            totalFiles: data.totalFiles,
            page,
            pageSize,
            loading: false,
          });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      uploadFile: async (file: File) => {
        set({ loading: true, error: null, success: null });
        try {
          const formData = new FormData();
          formData.append("file", file);

          const res = await fetch("/api/google", { method: "POST", body: formData });
          if (!res.ok) throw new Error("Upload failed");

          await get().fetchFiles(get().page, get().pageSize);
          set({ success: "File uploaded successfully" });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      deleteFile: async (id: string) => {
        set({ loading: true, error: null, success: null });
        try {
          const res = await fetch(`/api/google?id=${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Delete failed");

          await get().fetchFiles(get().page, get().pageSize);
          set({ success: "File deleted successfully" });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      renameFile: async (id: string, newName: string) => {
        set({ loading: true, error: null, success: null });
        try {
          const res = await fetch(`/api/google?id=${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newName }),
          });
          if (!res.ok) throw new Error("Rename failed");

          await get().fetchFiles(get().page, get().pageSize);
          set({ success: "File renamed successfully" });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      clearMessages: () => set({ error: null, success: null }),
    }),
    {
      name: "drive-store", // storage key in localStorage
      partialize: (state) => ({
        files: state.files,
        totalFiles: state.totalFiles,
        page: state.page,
        pageSize: state.pageSize,
      }),
    }
  )
);
