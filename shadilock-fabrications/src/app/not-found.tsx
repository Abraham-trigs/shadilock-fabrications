// app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue text-lightText p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page not found</p>
      <Link
        href="/"
        className="px-6 py-3 bg-orange text-blue rounded-lg font-semibold hover:bg-orangeHover transition"
      >
        Go Home
      </Link>
    </div>
  );
}
