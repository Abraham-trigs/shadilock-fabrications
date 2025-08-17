"use client";

import { useState, useEffect } from "react";
import Head from "next/head";

export default function Contact() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <>
      <Head>
        <title>
          Contact Shadilock Fabrication | Aluminium & Glass Solutions
        </title>
        <meta
          name="description"
          content="Get in touch with Shadilock Fabrication for quotes, inquiries, and support. High-quality aluminium and glass solutions in Accra, Ghana."
        />
        <meta property="og:title" content="Contact Shadilock Fabrication" />
        <meta
          property="og:description"
          content="Reach out for quotes, inquiries, or support for aluminium and glass solutions."
        />
        <meta property="og:type" content="website" />
      </Head>

      <section className="w-full bg-blue text-lightText px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 hover:text-orange transition-colors duration-300">
            Contact Us
          </h1>
          <p className="opacity-80">
            Reach out to us for quotes, inquiries, or support. We're happy to
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
            <label htmlFor="name" className="sr-only">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              aria-label="Your Name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="p-3 rounded-lg bg-darkBg border border-blue focus:border-orange focus:outline-none transition"
              required
            />

            <label htmlFor="email" className="sr-only">
              Your Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              aria-label="Your Email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="p-3 rounded-lg bg-darkBg border border-blue focus:border-orange focus:outline-none transition"
              required
            />

            <label htmlFor="phone" className="sr-only">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              aria-label="Phone Number"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="p-3 rounded-lg bg-darkBg border border-blue focus:border-orange focus:outline-none transition"
            />

            <label htmlFor="message" className="sr-only">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              aria-label="Your Message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="p-3 rounded-lg bg-darkBg border border-blue focus:border-orange focus:outline-none transition resize-none h-32"
              required
            />

            <button
              type="submit"
              className="bg-orange hover:bg-orangeHover text-darkBg font-bold py-3 px-6 rounded-lg transition"
            >
              Send Message
            </button>
          </form>

          {/* Company Info + Map */}
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
              <p>+233 24 000 0000</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Working Hours</h3>
              <p>Mon - Sat: 8:00 AM - 6:00 PM</p>
            </div>

            {/* Google Maps Embed */}
            <div className="mt-4 w-full h-64 rounded-lg overflow-hidden border border-blue">
              <div className="mt-8 w-full h-64 md:h-96 rounded-lg overflow-hidden border border-blue">
                <iframe
                  title="Shadilock Fabrication Location"
                  src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d496.3452759333099!2d-0.0780476097869873!3d5.602104889380039!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sgh!4v1755468175286!5m2!1sen!2sgh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
