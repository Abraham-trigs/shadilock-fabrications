"use client";
import Navbar from "@/components/layout/Navbar";
import ResponsiveBackground from "@/components/layout/ResponsiveBackground";
import HeroContent from "@/components/home/HeroContent";

const desktopBg = "./hero-desktop.webp";
const laptopBg = "./hero-Tablet.webp";
const mobileBg = "./hero-Mobile.webp";

export default function HomePage() {
  return (
    <main className="relative w-full text-lightText">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen">
        {/* Background */}
        <ResponsiveBackground
          desktop={desktopBg}
          laptop={laptopBg}
          mobile={mobileBg}
        />

        {/* Hero Content */}
        <HeroContent />
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
