import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        corvix: {
          bg: "#1A1A1A",
          surface: "#2E2E2E",
          accent: "#0077FF",
          "accent-hover": "#0066DD",
          text: "#F5F5F5",
          muted: "#A0A0A0",
        },
      },
      fontFamily: {
        display: ["Outfit", "sans-serif"],
        body: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
