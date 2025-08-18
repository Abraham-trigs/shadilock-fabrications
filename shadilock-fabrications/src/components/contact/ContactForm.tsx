"use client";

import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

export default function ContactForm() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => setAnimate(true), []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <section className="w-full bg-blue text-lightText px-6 md:px-12 lg:px-20 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo-white.webp"
            alt="Shadilock Fabrication Logo"
            width={120}
            height={120}
            className="object-contain animate-fadeInRotate"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 hover:text-orange transition-colors duration-300">
          Contact Us
        </h1>
        <p className="opacity-80">
          Reach out to us for quotes, inquiries, or support. We&apos;re happy to
          help!
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-12 md:grid-cols-2">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col gap-4 transform transition-all duration-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="p-3 rounded-lg bg-lightText border border-blue focus:border-orange focus:outline-none transition"
            required
          />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded-lg bg-lightText border border-blue focus:border-orange focus:outline-none transition"
            required
          />
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="p-3 rounded-lg bg-lightText border border-blue focus:border-orange focus:outline-none transition"
          />
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="p-3 rounded-lg bg-lightText border border-blue focus:border-orange focus:outline-none transition resize-none h-32"
            required
          />
          <button
            type="submit"
            className="bg-orange hover:bg-orangeHover text-darkBg font-bold py-3 px-6 rounded-lg transition"
          >
            Send Message
          </button>
        </form>

        {/* Company Info + Map + Socials */}
        <div
          className={`flex flex-col gap-6 text-lightText opacity-90 transform transition-all duration-700 delay-200 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          <div>
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p>123 Aluminium St., Accra, Ghana</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p>info@shadilock.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p>+233 246 786 638</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Working Hours</h3>
            <p>Mon - Sat: 8:00 AM - 6:00 PM</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/shadilock"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-orange border border-blueHover hover:bg-orange hover:text-darkBg transition"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://instagram.com/shadilock"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-orange border border-blueHover hover:bg-orange hover:text-darkBg transition"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://wa.me/233246786638"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-orange border border-blueHover hover:bg-orange hover:text-darkBg transition"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          <div className="mt-4 w-full h-64 rounded-lg overflow-hidden border border-blue">
            <iframe
              title="Shadilock Fabrication Location"
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d496.3452759333099!2d-0.0780476097869873!3d5.602104889380039!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sgh!4v1755468175286!5m2!1sen!2sgh"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
