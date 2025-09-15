"use client";

import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import emailjs from "@emailjs/browser";

// Initialize EmailJS with public key from environment variables
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

export default function ContactForm() {
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => setAnimate(true), []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      showNotification("error", "Please fill in all required fields!");
      return;
    }

    setLoading(true);

    try {
      // Send the visitor message to Shadilock inbox
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name, // visitor name
          reply_to: form.email, // visitor email
          phone: form.phone,
          message: form.message,
        }
      );

      showNotification("success", "Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });

      // Send auto-reply to visitor
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // can use a separate auto-reply template if needed
        {
          from_name: "Shadilock Fabrication Team",
          reply_to: form.email,
          message: `Hello ${form.name},

Thank you for reaching out to Shadilock Fabrication! We have received your request:

"${form.message}"

Our team will respond within 3 business days. For urgent inquiries, you can also reach us directly on WhatsApp:
https://wa.me/233246786638

Visit our website for more info: https://shadilockfabrications.com

Best regards,
The Shadilock Fabrication Team`,
        }
      );
    } catch (error) {
      console.error("Failed to send email:", error);
      showNotification("error", "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
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
          {/* Notification banner */}
          {notification && (
            <div
              className={`p-3 rounded-lg text-white font-semibold mb-2 ${
                notification.type === "success" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {notification.message}
            </div>
          )}

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
            className="p-3 rounded-lg bg-lightText border text-blue border-blue focus:border-orange focus:outline-none transition resize-none h-32"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-orange hover:bg-orangeHover text-darkBg font-bold py-3 px-6 rounded-lg transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
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
            <p>Mantse odai Tawiah street</p>
            <p>GZ- 024-5401</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p>shadrackbortey19@gmail.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p>+233 246 786 638</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Working Hours</h3>
            <p>Mon - Sat: 7:00 AM - 5:00 PM</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100066929106476"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-orange border border-blueHover hover:bg-orange hover:text-darkBg transition"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://www.instagram.com/shadilockfabrication/"
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
