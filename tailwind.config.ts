import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        gold: {
          50: "#fdf8ef",
          100: "#f5ebd4",
          200: "#e8d5a3",
          300: "#d4ba6e",
          400: "#c9a84c",
          500: "#b8942e",
          600: "#a07a24",
          700: "#86631f",
          800: "#6e4f1e",
          900: "#5a3f1c",
        },
        midnight: {
          50: "#f4f6f7",
          100: "#e2e8eb",
          200: "#c8d4d9",
          300: "#a1b5be",
          400: "#738e9b",
          500: "#587380",
          600: "#4b606d",
          700: "#41515b",
          800: "#3a464e",
          900: "#1a1f24",
          950: "#0d1114",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
