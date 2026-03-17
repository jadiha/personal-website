import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Pastel pink → rose
        pink: {
          200: "#FFD9E4",
          400: "#FFC2D0",
          500: "#FFB3C6",
          600: "#FF9CAE",
        },
        // Map purple → peach so gradients go pink → peach
        purple: {
          200: "#FFE4CC",
          500: "#FFCBA8",
          600: "#FFB885",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
