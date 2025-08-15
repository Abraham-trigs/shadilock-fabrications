// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Dark Mode Palette
        blue: "#080023",
        blueHover: "#15005c",
        orange: "#ff7800",
        orangeHover: "#8a4100",
        lightText: "#f4f4f4",
        darkBg: "#1b1b1c", // dark background for dark mode
      },
    },
  },
  plugins: [],
}

export default config;
