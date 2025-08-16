"use client";

interface LogoStripProps {
  logoSrc: string;
}

export default function LogoStrip({ logoSrc }: LogoStripProps) {
  return (
    <div
      className="
        w-full flex justify-center items-center
        bg-lightText
        h-40 sm:h-48 md:h-56 lg:h-64 xl:h-80 2xl:h-96
        rounded-xl
        transition-all
      "
    >
      <img
        src={logoSrc}
        alt="Logo"
        className="
          h-28 sm:h-36 md:h-44 lg:h-56 xl:h-72 2xl:h-80
          object-contain transition-all
        "
      />
    </div>
  );
}
