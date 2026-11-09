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
          DEFAULT: "#0a0b0e",
          soft: "#12141a",
          line: "#2a2e38",
        },
        mist: {
          DEFAULT: "#c8ccd6",
          muted: "#8b919e",
        },
        silver: "#d7dbe3",
        champagne: "#c4a574",
        /** Accent from the electric-blue Cullinan hero */
        signal: "#1f5eff",
        cobalt: {
          DEFAULT: "#1f5eff",
          deep: "#1439a8",
          glow: "#6b93ff",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        asphalt:
          "radial-gradient(1100px 560px at 75% 8%, rgba(31,94,255,0.22), transparent 55%), radial-gradient(900px 500px at 8% 85%, rgba(196,165,116,0.08), transparent 50%), linear-gradient(160deg, #0a0b0e 0%, #121722 45%, #0a0b0e 100%)",
      },
      keyframes: {
        kenburns: {
          "0%": { transform: "scale(1.04) translate3d(0,0,0)" },
          "100%": { transform: "scale(1.12) translate3d(-1.2%, 0.8%, 0)" },
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
