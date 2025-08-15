"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

const desktopBg = "./hero-desktop.webp";
const laptopBg = "./hero-Tablet.webp";
const mobileBg = "./hero-Mobile.webp";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("");
  const [screen, setScreen] = useState<"mobile" | "laptop" | "desktop">(
    "mobile"
  );
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className="relative w-full min-h-screen text-lightText">
      {/* Background Images */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <img
          src={desktopBg}
          alt="desktop background"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            screen === "desktop" ? "opacity-100" : "opacity-0"
          }`}
        />
        <img
          src={laptopBg}
          alt="laptop background"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            screen === "laptop" ? "opacity-100" : "opacity-0"
          }`}
        />
        <img
          src={mobileBg}
          alt="mobile background"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            screen === "mobile" ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Navbar */}
      <nav className="bg-blue text-lightText shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="text-2xl font-bold text-orange">
                  Shadilock
                </span>
              </Link>
            </div>

            {/* Desktop Links + Request Button */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`hover:text-orangeHover ${
                    activeLink === link.href ? "text-orange font-semibold" : ""
                  }`}
                  onClick={() => setActiveLink(link.href)}
                >
                  {link.name}
                </Link>
              ))}
              <button className="ml-4 px-4 py-2 bg-orange text-blue font-semibold rounded-lg shadow-md hover:bg-orangeHover transition">
                Request a Service
              </button>
            </div>

            {/* Hamburger Menu */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-lightText hover:text-orange focus:outline-none"
              >
                {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            ref={menuRef}
            className="md:hidden bg-blue w-[70%] absolute top-16 right-0 shadow-lg border-l border-blueHover p-4 space-y-4 transition-transform"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-2 py-2 rounded hover:bg-blueHover ${
                  activeLink === link.href
                    ? "bg-orange font-semibold"
                    : "text-lightText"
                }`}
                onClick={() => {
                  setActiveLink(link.href);
                  setIsOpen(false);
                }}
              >
                {link.name}
              </Link>
            ))}
            <button className="w-full px-4 py-2 bg-orange text-blue font-semibold rounded-lg shadow-md hover:bg-orangeHover transition">
              Request a Service
            </button>
          </div>
        )}
      </nav>

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
