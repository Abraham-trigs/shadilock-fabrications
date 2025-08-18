"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
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
        {/* Speed Insights for real-user performance monitoring */}
        <SpeedInsights />

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
