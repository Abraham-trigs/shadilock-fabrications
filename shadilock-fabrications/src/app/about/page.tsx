import { Card, CardContent } from "@/components/ui/card";
import { Star, Shield, Pencil, Truck } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: "About Us | Shadilock Fabrication",
  description:
    "Learn about Shadilock Fabrication, a leading provider of aluminium and glass solutions, dedicated to quality, innovation, and customer satisfaction.",
  openGraph: {
    title: "About Us | Shadilock Fabrication",
    description:
      "Discover our story, core values, and the expert team behind Shadilock Fabrication's aluminium and glass solutions.",
    images: ["/logo-white.webp"],
  },
};

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
  { name: "Alice Johnson", role: "CEO", img: "/team.png" },
  { name: "David Smith", role: "Lead Designer", img: "/team.png" },
  { name: "Maria Lee", role: "Project Manager", img: "/team.png" },
  { name: "James Brown", role: "Fabrication Expert", img: "/team.png" },
  { name: "Sophia Davis", role: "Customer Support", img: "/team.png" },
];

export default function About() {
  return (
    <main className="w-full bg-blue text-lightText px-6 md:px-12 lg:px-20 py-16">
      {/* Hero / Intro */}
      <section
        aria-labelledby="about-heading"
        className="max-w-4xl mx-auto text-center mb-16"
      >
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo-white.webp"
            alt="Shadilock Fabrication Company Logo"
            width={120}
            height={120}
            priority
            className="object-contain animate-fadeInRotate"
          />
        </div>

        <h1
          id="about-heading"
          className="text-4xl md:text-5xl font-bold mb-4 hover:scale-105 transition-transform duration-300"
        >
          About Our Company
        </h1>
        <p className="text-lightText opacity-80 font-medium">
          We are a leading provider of aluminium and glass solutions, committed
          to quality, innovation, and customer satisfaction.
        </p>
      </section>

      {/* Our Story */}
      <section
        aria-labelledby="our-story-heading"
        className="max-w-4xl mx-auto mb-16"
      >
        <h2
          id="our-story-heading"
          className="text-3xl font-bold mb-4 hover:text-orangeHover transition-colors duration-300"
        >
          Our Story
        </h2>
        <article className="text-lightText opacity-80 leading-relaxed">
          Founded with a passion for quality craftsmanship, our company has
          grown into a trusted partner for clients seeking durable, stylish, and
          innovative aluminium and glass solutions. Our team combines technical
          expertise with a commitment to exceptional service.
        </article>
      </section>

      {/* Core Values */}
      <section
        aria-labelledby="core-values-heading"
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <h2
          id="core-values-heading"
          className="text-3xl md:text-4xl font-bold text-lightText mb-12"
        >
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, idx) => {
            const Icon = value.icon;
            return (
              <Card
                key={idx}
                className="bg-blueHover border border-orange hover:bg-blue rounded-2xl p-6
                           transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <CardContent className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-xl border border-lightText ">
                    <Icon className="w-10 h-10 text-orange" />
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
      </section>

      {/* Team Section */}
      <section
        aria-labelledby="team-heading"
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <h2
          id="team-heading"
          className="text-3xl md:text-4xl font-bold text-lightText mb-12"
        >
          Meet Our Team
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
            >
              {/* <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-lightText">
                <Image
                  src={member.img}
                  alt={`${member.name}, ${member.role}`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div> */}
              <h3 className="text-lg font-semibold text-lightText">
                {/* {member.name} */}
              </h3>
              <p className="text-sm text-lightText opacity-80">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
