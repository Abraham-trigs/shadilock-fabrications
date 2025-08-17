"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Shield, Pencil, Truck } from "lucide-react";

const coreValues = [
  {
    title: "Experience",
    icon: Star,
    desc: "Years of industry experience delivering top-notch solutions.",
  },
  {
    title: "Quality Materials",
    icon: Shield,
    desc: "We use only the best materials for durability and elegance.",
  },
  {
    title: "Custom Designs",
    icon: Pencil,
    desc: "Tailored designs to match your unique style and needs.",
  },
  {
    title: "Fast Delivery",
    icon: Truck,
    desc: "Quick and reliable delivery to keep your projects on schedule.",
  },
];

const teamMembers = [
  { name: "Alice Johnson", role: "CEO", img: "/team/alice.jpg" },
  { name: "David Smith", role: "Lead Designer", img: "/team/david.jpg" },
  { name: "Maria Lee", role: "Project Manager", img: "/team/maria.jpg" },
  { name: "James Brown", role: "Fabrication Expert", img: "/team/james.jpg" },
  { name: "Sophia Davis", role: "Customer Support", img: "/team/sophia.jpg" },
];

export default function About() {
  return (
    <section className="w-full bg-blue text-lightText px-6 md:px-12 lg:px-20 py-16">
      {/* Hero / Intro */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 hover:scale-105 transition-transform duration-300">
          About Our Company
        </h1>
        <p className="text-lightText opacity-80 font-medium">
          We are a leading provider of aluminium and glass solutions, committed
          to quality, innovation, and customer satisfaction.
        </p>
      </div>

      {/* Our Story */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-4 hover:text-orangeHover transition-colors duration-300">
          Our Story
        </h2>
        <p className="text-lightText opacity-80 leading-relaxed">
          Founded with a passion for quality craftsmanship, our company has
          grown into a trusted partner for clients seeking durable, stylish, and
          innovative aluminium and glass solutions. Our team combines technical
          expertise with a commitment to exceptional service.
        </p>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-lightText mb-12">
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, idx) => {
            const Icon = value.icon;
            return (
              <Card
                key={idx}
                className="bg-[#080023] border border-[#15005c] rounded-2xl p-6
                           transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <CardContent className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-xl bg-[#15005c] border border-[#080023]">
                    <Icon className="w-10 h-10 text-[#ff7800]" />
                  </div>
                  <h3 className="text-lg font-semibold text-lightText mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-lightText opacity-80">
                    {value.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-lightText mb-12">
          Meet Our Team
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
            >
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-[#15005c]">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-lightText">
                {member.name}
              </h3>
              <p className="text-sm text-lightText opacity-80">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
