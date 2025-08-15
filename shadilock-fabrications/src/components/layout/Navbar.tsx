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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);

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
    <nav className="bg-blue text-lightText shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-orange">
            Shadilock
          </Link>

          {/* Desktop Links + Button */}
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

            <button className="ml-4 px-4 py-2 bg-orange text-blue font-semibold rounded-lg shadow-md hover:bg-orangeHover transition-transform transform hover:scale-105 active:scale-95">
              Request a Service
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden text-lightText focus:outline-none transform transition-transform duration-300 ${
              isOpen ? "rotate-90 scale-110" : ""
            }`}
          >
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
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

          <button className="w-full px-4 py-2 bg-orange text-blue font-semibold rounded-lg shadow-md hover:bg-orangeHover transition-transform transform hover:scale-105 active:scale-95">
            Request a Service
          </button>
        </div>
      )}
    </nav>
  );
}
