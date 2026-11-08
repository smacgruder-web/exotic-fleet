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
        ink: {
          DEFAULT: "#0b0c0f",
          soft: "#14161c",
          line: "#2a2e38",
        },
        mist: {
          DEFAULT: "#c8ccd6",
          muted: "#8b919e",
        },
        silver: "#d7dbe3",
        champagne: "#c4a574",
        signal: "#b11226",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        asphalt:
          "radial-gradient(1200px 600px at 70% 10%, rgba(177,18,38,0.18), transparent 55%), radial-gradient(900px 500px at 10% 80%, rgba(196,165,116,0.12), transparent 50%), linear-gradient(160deg, #0b0c0f 0%, #151821 45%, #0b0c0f 100%)",
      },
      keyframes: {
        kenburns: {
          "0%": { transform: "scale(1.05) translate3d(0,0,0)" },
          "100%": { transform: "scale(1.14) translate3d(-1.5%, 1%, 0)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        reveal: {
          "0%": { opacity: "0.35", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        kenburns: "kenburns 18s ease-out forwards",
        rise: "rise 0.9s ease-out both",
        reveal: "reveal 0.55s ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
