// app/layout.tsx
"use client";

import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        <Navbar />
        {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
