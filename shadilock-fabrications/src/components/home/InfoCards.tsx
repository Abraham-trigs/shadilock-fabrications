"use client";

interface Card {
  title: string;
  text: string;
}

const cards: Card[] = [
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
];

export default function InfoCards() {
  return (
    <section className="px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:px-12 lg:px-24">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-blueHover hover:bg-blue ease-in-out rounded-lg p-6 shadow-md hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold text-orange mb-2">{card.title}</h2>
          <p className="text-lightText">{card.text}</p>
        </div>
      ))}
    </section>
  );
}
