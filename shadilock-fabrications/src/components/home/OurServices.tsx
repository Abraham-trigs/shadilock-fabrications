"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  DoorOpen,
  Layers,
  PanelsTopLeft,
  Store,
  Building,
  Umbrella,
} from "lucide-react";

// Custom Window Icon
const WindowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="12" y1="3" x2="12" y2="21" />
    <line x1="3" y1="12" x2="21" y2="12" />
  </svg>
);

// Custom Tool Icon
const ToolIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.7 3.3a2 2 0 1 1 2.8 2.8l-1.4 1.4-2.8-2.8 1.4-1.4z" />
    <path d="M4 21v-4.5l9.5-9.5 4.5 4.5-9.5 9.5H4z" />
  </svg>
);

const services = [
  {
    title: "Aluminium Windows",
    icon: WindowIcon,
    desc: "Durable, stylish and energy efficient windows.",
  },
  {
    title: "Aluminium Doors",
    icon: DoorOpen,
    desc: "Modern, secure and customizable door solutions.",
  },
  {
    title: "Aluminium Railings",
    icon: PanelsTopLeft,
    desc: "Safety railings designed with precision and strength.",
  },
  {
    title: "Shop Fronts",
    icon: Store,
    desc: "Elegant shop fronts to showcase your business.",
  },
  {
    title: "Partitions",
    icon: Layers,
    desc: "Smart partitioning systems for offices and homes.",
  },
  {
    title: "Custom Fabrication",
    icon: ToolIcon,
    desc: "Tailored metal fabrication to match your needs.",
  },
  {
    title: "Curtain Walls",
    icon: Building,
    desc: "High-performance glass curtain walling systems.",
  },
  {
    title: "Canopies & Shades",
    icon: Umbrella,
    desc: "Stylish and durable outdoor shading solutions.",
  },
];

export default function OurServices() {
  return (
    <section className="relative w-full bg-surface py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-6">
          Our Services
        </h2>
        <p className="text-textSecondary max-w-2xl mx-auto mb-12">
          We specialize in a wide range of aluminium and glass solutions
          designed to meet modern architectural needs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Card
                key={idx}
                className="bg-lightText border-borderAlt rounded-2xl 
                  transform transition-transform duration-300 hover:scale-105 hover:shadow-xl
                  animate-fadeIn"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div
                    className="w-16 h-16 mb-4 flex items-center justify-center rounded-xl 
                    bg-surface border border-borderAlt transition-colors duration-300 hover:bg-blueHover"
                  >
                    <Icon className="w-10 h-10 text-sea transition-colors duration-300 hover:text-orangeHover" />
                  </div>
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-textSecondary">{service.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s forwards;
        }
      `}</style>
    </section>
  );
}
