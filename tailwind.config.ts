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
          DEFAULT: "#14161c",
          soft: "#eef1f6",
          line: "#d5dae3",
        },
        mist: {
          DEFAULT: "#3d4452",
          muted: "#6b7385",
        },
        silver: "#14161c",
        champagne: "#9a7b4f",
        signal: "#1a3a8f",
        cobalt: {
          DEFAULT: "#1a3a8f",
          deep: "#102456",
          glow: "#2f5ec4",
        },
        paper: {
          DEFAULT: "#ffffff",
          soft: "#f7f8fb",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        asphalt:
          "radial-gradient(1000px 520px at 85% 0%, rgba(26,58,143,0.07), transparent 55%), linear-gradient(165deg, #f7f8fb 0%, #eef1f6 50%, #f3f5f8 100%)",
      },
      keyframes: {
        kenburns: {
          "0%": { transform: "scale(1.02) translate3d(0,0,0)" },
          "100%": { transform: "scale(1.08) translate3d(-0.8%, 0.5%, 0)" },
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
