"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";

const desktopBg = "./hero-desktop.webp";
const laptopBg = "./hero-Tablet.webp";
const mobileBg = "./hero-Mobile.webp";

export default function HomePage() {
  const [screen, setScreen] = useState<"mobile" | "laptop" | "desktop">(
    "mobile"
  );
  const [scrollY, setScrollY] = useState(0);

  // Handle screen size for background
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setScreen("desktop");
      else if (width >= 768) setScreen("laptop");
      else setScreen("mobile");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll for parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax transform style
  const parallaxStyle = (factor: number) => ({
    transform: `translateY(${scrollY * factor}px)`,
    transition: "transform 0.1s ease-out",
  });

  return (
    <main className="relative w-full min-h-screen text-lightText">
      {/* Navbar */}
      <Navbar />

      {/* Background Images */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <img
          src={desktopBg}
          alt="desktop background"
          style={parallaxStyle(0.3)}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            screen === "desktop" ? "opacity-100" : "opacity-0"
          }`}
        />
        <img
          src={laptopBg}
          alt="laptop background"
          style={parallaxStyle(0.3)}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            screen === "laptop" ? "opacity-100" : "opacity-0"
          }`}
        />
        <img
          src={mobileBg}
          alt="mobile background"
          style={parallaxStyle(0.3)}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            screen === "mobile" ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Hero Content */}
      <section className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Welcome to Shadilock
        </h1>
        <p className="text-lightText max-w-xl mb-6">
          Your trusted partner in high-quality locksmith services. Secure,
          reliable, and efficient solutions tailored for your needs.
        </p>
        <button className="px-6 py-3 bg-orange text-blue font-semibold rounded-lg shadow-md hover:bg-orangeHover transition">
          Request a Service
        </button>
      </section>

      {/* Info Cards */}
      <section className="px-6 py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:px-12 lg:px-24">
        <div className="bg-blueHover rounded-lg p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-orange mb-2">
            24/7 Availability
          </h2>
          <p className="text-lightText">
            We are always ready to respond to your locksmith needs at any time
            of the day.
          </p>
        </div>
        <div className="bg-blueHover rounded-lg p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-orange mb-2">
            Professional Team
          </h2>
          <p className="text-lightText">
            Our certified experts provide top-notch service ensuring security
            and reliability.
          </p>
        </div>
        <div className="bg-blueHover rounded-lg p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-orange mb-2">Fast Response</h2>
          <p className="text-lightText">
            Quick and efficient solutions to get you back on track without
            delay.
          </p>
        </div>
        <div className="bg-blueHover rounded-lg p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-orange mb-2">
            Affordable Pricing
          </h2>
          <p className="text-lightText">
            Competitive rates without compromising quality or security.
          </p>
        </div>
        <div className="bg-blueHover rounded-lg p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-orange mb-2">
            Reliable Security
          </h2>
          <p className="text-lightText">
            Advanced solutions to keep your home, office, or vehicle secure.
          </p>
        </div>
        <div className="bg-blueHover rounded-lg p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-orange mb-2">
            Customer Support
          </h2>
          <p className="text-lightText">
            Friendly and knowledgeable support team ready to assist you.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blueHover text-lightText text-center py-6 mt-12">
        <p>&copy; {new Date().getFullYear()} Shadilock. All rights reserved.</p>
      </footer>
    </main>
  );
}
