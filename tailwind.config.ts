import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        white: "#EDEDED",
        ink: "#0B0B0B",
        coal: "#101010",
        graphite: "#171717",
        line: "rgba(237,237,237,0.12)",
        muted: "rgba(237,237,237,0.72)",
        gold: "#C8A95A",
        "gold-soft": "#C8A95A"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        "gold-glow": "0 0 60px rgba(200, 169, 90, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
