"use client";

import Image from "next/image";

interface LogoStripProps {
  logoSrc: string;
  altText?: string;
}

export default function LogoStrip({
  logoSrc,
  altText = "Logo",
}: LogoStripProps) {
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
      <Image
        src={logoSrc}
        alt={altText}
        width={384} // corresponds to xl:h-48 (48 * 8px = 384px)
        height={192} // adjust proportionally to your logo
        className="
          h-20 sm:h-28 md:h-32 lg:h-40 xl:h-48
          object-contain transition-all
        "
        priority
      />
    </div>
  );
}
