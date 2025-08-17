import Image from "next/image";
import { Metadata } from "next";
import {
  FaTools,
  FaDraftingCompass,
  FaCogs,
  FaTruck,
  FaPaintRoller,
  FaHammer,
} from "react-icons/fa";

// ✅ SEO metadata
export const metadata: Metadata = {
  title: "Our Services | Shadilock Fabrications",
  description:
    "Discover Shadilock Fabrications' professional services including metal fabrication, custom designs, precision engineering, finishing, and installation. Built to last with quality and innovation.",
  keywords: [
    "Shadilock",
    "Shadilock Fabrications",
    "metal fabrication",
    "steel fabrication",
    "custom designs",
    "precision engineering",
    "finishing",
    "installation",
    "fabricators in Ghana",
  ],
  openGraph: {
    title: "Shadilock Fabrications - Services",
    description:
      "Explore the wide range of fabrication and engineering services Shadilock Fabrications offers to meet your needs.",
    url: "https://shadilock.com/services", // 🔁 update when domain is live
    siteName: "Shadilock Fabrications",
    images: [
      {
        url: "https://shadilock.com/og-image.jpg", // 🔁 replace with real OG image
        width: 1200,
        height: 630,
        alt: "Shadilock Fabrications Services",
      },
    ],
    type: "website",
  },
};

export default function Services() {
  const services = [
    {
      icon: <FaTools className="text-orange text-5xl mb-4" />,
      title: "Metal Fabrication",
      desc: "High-quality metal fabrication tailored to your specifications.",
    },
    {
      icon: <FaDraftingCompass className="text-blue text-5xl mb-4" />,
      title: "Custom Designs",
      desc: "Unique and creative designs to match your vision.",
    },
    {
      icon: <FaCogs className="text-orange text-5xl mb-4" />,
      title: "Precision Engineering",
      desc: "State-of-the-art technology ensuring accuracy and durability.",
    },
    {
      icon: <FaTruck className="text-blue text-5xl mb-4" />,
      title: "Fast Delivery",
      desc: "On-time delivery without compromising quality.",
    },
    {
      icon: <FaPaintRoller className="text-orange text-5xl mb-4" />,
      title: "Finishing & Coating",
      desc: "Professional surface treatments for lasting protection.",
    },
    {
      icon: <FaHammer className="text-blue text-5xl mb-4" />,
      title: "Installation Services",
      desc: "Expert setup and installation for all your projects.",
    },
  ];

  return (
    <section>
      {/* Hero Section */}
      <div className="relative  text-white py-20 px-6 md:px-12 text-center">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo-white.webp"
            alt="Shadilock Fabrication Logo"
            width={120}
            height={120}
            className="object-contain animate-fadeInRotate"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Our Services
        </h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          We are a leading provider of aluminium and glass solutions, committed
          to quality, innovation, and customer satisfaction.
        </p>
      </div>

      {/* Services Grid */}
      <div className="py-16 px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-lightText mb-6 hover:text-orange transition-colors">
          What We Offer
        </h2>
        <p className="text-lightText max-w-2xl mx-auto mb-12 opacity-80">
          At Shadilock Fabrications, we provide a wide range of professional
          fabrication and engineering services to meet your needs.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-lightText border border-blueHover rounded-2xl p-6 hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
            >
              {service.icon}
              <h3 className="text-xl font-bold text-blueHover mb-2">
                {service.title}
              </h3>
              <p className="text-blue opacity-80">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
