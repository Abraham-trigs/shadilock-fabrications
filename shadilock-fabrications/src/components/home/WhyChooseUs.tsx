"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Package, Pencil, Truck, Shield, Clock } from "lucide-react";

interface Reason {
  title: string;
  icon: React.ForwardRefExoticComponent<any>;
  desc: string;
}

const reasons: Reason[] = [
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
  {
    title: "Reliable Support",
    icon: Package,
    desc: "Dedicated support to assist you at every step.",
  },
  {
    title: "Timely Completion",
    icon: Clock,
    desc: "We finish projects on time without compromising quality.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative w-full py-16 px-6 md:px-12 lg:px-20 mt-15">
      <div className="max-w-7xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-bold text-lightText mb-6 
               transition-transform duration-300 hover:scale-105 hover:text-orangeHover"
        >
          Why Choose Us
        </h2>
        <p
          className="text-lightText max-w-2xl mx-auto mb-12 opacity-80 font-bold
               transition-colors duration-300 hover:text-orangeHover"
        >
          We stand out in the industry by delivering high-quality solutions that
          meet our clients&apos; expectations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <Card
                key={idx}
                className="bg-orange Hover:bg-blue border border-blue rounded-2xl 
                  transform transition-transform duration-300 hover:scale-105 hover:shadow-lg
                  animate-fadeIn"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div
                    className="w-16 h-16 mb-4 flex items-center justify-center rounded-xl 
                    bg-blue border border-blueHover transition-colors duration-300 hover:bg-blueHover"
                  >
                    <Icon className="w-10 h-10 text-orange transition-colors duration-300 hover:text-orangeHover" />
                  </div>
                  <h3 className="text-lg font-bold text-lightText mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-lightText opacity-80">
                    {reason.desc}
                  </p>
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
