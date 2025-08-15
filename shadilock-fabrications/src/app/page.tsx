"use client";
import Navbar from "@/components/layout/Navbar";
import ResponsiveBackground from "@/components/layout/ResponsiveBackground";

const desktopBg = "./hero-desktop.webp";
const laptopBg = "./hero-Tablet.webp";
const mobileBg = "./hero-Mobile.webp";

export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen text-lightText">
      {/* Navbar */}
      <Navbar />

      {/* Responsive Background */}
      <ResponsiveBackground
        desktop={desktopBg}
        laptop={laptopBg}
        mobile={mobileBg}
      />

      {/* Hero Content */}
      <section className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Welcome to Shadilock
        </h1>
        <p className="text-lightText max-w-xl mb-6">
          Your trusted partner in high-quality locksmith services. Secure,
          reliable, and efficient solutions tailored for your needs.
        </p>
        <button className="px-6 py-3 bg-orange text-blue font-semibold rounded-lg shadow-md hover:bg-orangeHover transition-transform transform hover:scale-105 active:scale-95">
          Request a Service
        </button>
      </section>

      {/* Info Cards */}
      <section className="px-6 py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:px-12 lg:px-24">
        {[
          {
            title: "24/7 Availability",
            text: "We are always ready to respond to your locksmith needs at any time of the day.",
          },
          {
            title: "Professional Team",
            text: "Our certified experts provide top-notch service ensuring security and reliability.",
          },
          {
            title: "Fast Response",
            text: "Quick and efficient solutions to get you back on track without delay.",
          },
          {
            title: "Affordable Pricing",
            text: "Competitive rates without compromising quality or security.",
          },
          {
            title: "Reliable Security",
            text: "Advanced solutions to keep your home, office, or vehicle secure.",
          },
          {
            title: "Customer Support",
            text: "Friendly and knowledgeable support team ready to assist you.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-blueHover rounded-lg p-6 shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold text-orange mb-2">{card.title}</h2>
            <p className="text-lightText">{card.text}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-blueHover text-lightText text-center py-6 mt-12">
        <p>&copy; {new Date().getFullYear()} Shadilock. All rights reserved.</p>
      </footer>
    </main>
  );
}
