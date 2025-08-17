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
        h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64
        rounded-xl
        transition-all
      "
    >
      <img
        src={logoSrc}
        alt="Logo"
        className="
          h-20 sm:h-28 md:h-32 lg:h-40 xl:h-48
          object-contain transition-all
        "
      />
    </div>
  );
}
