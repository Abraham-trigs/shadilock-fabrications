"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-blueHover text-lightText mt-40">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Brand / Logo */}
        <div>
          <Link href="/appointment">
            <h2 className="text-xl font-bold mb-2 cursor-pointer hover:text-white">
              Shadilock
            </h2>
          </Link>
          <p className="text-sm opacity-80">
            Aluminium & Glass Solutions with quality, innovation, and customer
            satisfaction.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://www.facebook.com/profile.php?id=100066929106476"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaFacebookF className="text-2xl" />
            </a>
            <a
              href="https://www.instagram.com/shadilockfabrication/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://wa.me/233246786638?text=Hello%20Shadilock%20Fabrications%20👋%0A%0APlease%20choose%20an%20option%20to%20help%20us%20assist%20you%20quickly%3A%0A1%E2%83%A3%20Services%0A2%E2%83%A3%20Get%20a%20Quote%0A3%E2%83%A3%20Contact%20Support%0A%0AYou%20can%20also%20visit%20our%20website%20for%20more%20information%3A%20https%3A%2F%2Fshadilockfabrications.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaWhatsapp className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-lightText border-opacity-20 mt-6 pt-4 mb-4 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} Shadilock. All rights reserved.</p>
      </div>
    </footer>
  );
}
