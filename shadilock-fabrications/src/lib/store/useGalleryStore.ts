"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GalleryFile {
  name: string;
  url: string;
}

interface GalleryState {
  allFiles: GalleryFile[];
  files: GalleryFile[];
  loading: boolean;
  page: number;
  pageSize: number;

  selectedIndex: number | null;

  // Actions
  fetchFiles: (page?: number, pageSize?: number, force?: boolean) => Promise<void>;
  refresh: () => Promise<void>;
  loadMore: () => void;

  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  nextImage: () => void;
  prevImage: () => void;
}

export const useGalleryStore = create<GalleryState>()(
  persist(
    (set, get) => ({
      allFiles: [],
      files: [],
      loading: false,
      page: 1,
      pageSize: 8,

      selectedIndex: null,

      // Fetch with caching
      fetchFiles: async (page = 1, pageSize = get().pageSize, force = false) => {
        if (!force && get().allFiles.length > 0) {
          // Already cached → just paginate
          set({
            files: get().allFiles.slice((page - 1) * pageSize, page * pageSize),
            page,
            pageSize,
          });
          return;
        }

        set({ loading: true });
        try {
          const res = await fetch(`/api/gallery?page=${page}&pageSize=${pageSize}`);
          const data = await res.json();

          const allFiles: GalleryFile[] = data.files.map((file: string) => ({
            name: file,
            url: `/gallery/${file}`, // adjust path if needed
          }));

          set({
            allFiles,
            files: allFiles.slice((page - 1) * pageSize, page * pageSize),
            page,
            pageSize,
          });
        } catch (err) {
          console.error("Failed to fetch gallery files:", err);
          set({ allFiles: [], files: [] });
        } finally {
          set({ loading: false });
        }
      },

      // Refresh always forces a new fetch
      refresh: async () => {
        await get().fetchFiles(1, get().pageSize, true);
      },

      // Load more for infinite scroll
      loadMore: () => {
        const { allFiles, files, pageSize } = get();
        const nextFiles = allFiles.slice(files.length, files.length + pageSize);
        if (nextFiles.length > 0) {
          set({ files: [...files, ...nextFiles] });
        }
      },

      // Lightbox controls
      openLightbox: (index: number) => set({ selectedIndex: index }),
      closeLightbox: () => set({ selectedIndex: null }),

      nextImage: () => {
        const { selectedIndex, allFiles } = get();
        if (selectedIndex !== null && selectedIndex < allFiles.length - 1) {
          set({ selectedIndex: selectedIndex + 1 });
        }
      },

      prevImage: () => {
        const { selectedIndex } = get();
        if (selectedIndex !== null && selectedIndex > 0) {
          set({ selectedIndex: selectedIndex - 1 });
        }
      },
    }),
    {
      name: "gallery-storage",
      // Avoid persisting transient UI state
      partialize: (state) => ({
        allFiles: state.allFiles,
        files: state.files,
        page: state.page,
        pageSize: state.pageSize,
      }),
    }
  )
);
