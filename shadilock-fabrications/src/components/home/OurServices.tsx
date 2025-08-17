"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  DoorOpen,
  Window,
  PanelsTopLeft,
  Store,
  SquareSplitVertical,
  Hammer,
  Building,
  Umbrella,
} from "lucide-react";

const services = [
  {
    title: "Aluminium Windows",
    icon: Window,
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
    icon: SquareSplitVertical,
    desc: "Smart partitioning systems for offices and homes.",
  },
  {
    title: "Custom Fabrication",
    icon: Hammer,
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
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-6">
          Our Services
        </h2>
        <p className="text-textSecondary max-w-2xl mx-auto mb-12">
          We specialize in a wide range of aluminium and glass solutions
          designed to meet modern architectural needs.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Card
                key={idx}
                className="bg-background border-borderAlt hover:shadow-lg transition rounded-2xl"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-xl bg-surface border border-borderAlt">
                    <Icon className="w-10 h-10 text-sea" />
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
    </section>
  );
}
