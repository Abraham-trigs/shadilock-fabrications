"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Navbar */}
        <Navbar />

        {/* Main page content */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
