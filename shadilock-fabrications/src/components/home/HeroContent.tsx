"use client";

export default function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-20 md:py-32">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
        Welcome to Shadilock
      </h1>
      <p className="text-lightText max-w-xl mb-4">
        Your trusted partner in high-quality locksmith services. Secure,
        reliable, and efficient solutions tailored for your needs.
      </p>
      <button className="px-6 py-3 bg-orange text-blue font-semibold rounded-lg shadow-md hover:bg-orangeHover transition-transform transform hover:scale-105 active:scale-95">
        Request a Service
      </button>
    </div>
  );
}
