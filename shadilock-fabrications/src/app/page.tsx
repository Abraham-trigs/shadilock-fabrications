import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-blue min-h-screen text-lightText">
      {/* Navbar */}

      {/* Hero Section */}
      <section className="pt-24 px-6 text-center md:text-left md:px-12 lg:px-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-orange">
          Welcome to Shadilock
        </h1>
        <p className="text-lightText mb-6 max-w-xl mx-auto md:mx-0">
          Your trusted partner in high-quality locksmith services. We deliver
          secure, reliable, and efficient solutions tailored for your needs.
        </p>
        <a
          href="#services"
          className="inline-block px-6 py-3 bg-orange text-blue font-semibold rounded hover:bg-orangeHover transition"
        >
          Explore Services
        </a>
      </section>

      {/* Info Cards */}
      <section
        id="services"
        className="px-6 py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:px-12 lg:px-24"
      >
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
