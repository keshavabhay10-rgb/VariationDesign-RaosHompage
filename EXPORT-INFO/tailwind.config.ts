import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0D0D0D",
          secondary: "#1A1A1A",
          card: "#2D2D2D",
        },
        gold: {
          DEFAULT: "#C9963B",
          light: "#D4A843",
        },
        copper: "#B87333",
        ember: "rgba(232, 118, 42, 0.1)",
        text: {
          primary: "#F5F0EB",
          secondary: "#A0978E",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["DM Sans", "sans-serif"],
      },
      animation: {
        "chevron-bounce": "chevronBounce 2s ease-in-out infinite",
        "loader-pulse": "loaderPulse 1.5s ease-in-out infinite",
        "fire-glow": "fireGlow 4s ease-in-out infinite alternate",
        "embers-float": "embersFloat 6s ease-in-out infinite",
        "sizzler-float": "sizzlerFloat 4s ease-in-out infinite",
        "wisp-1": "wisp1 3.5s ease-in-out infinite",
        "wisp-2": "wisp2 4s 0.5s ease-in-out infinite",
        "wisp-3": "wisp3 3s 1s ease-in-out infinite",
        "wisp-4": "wisp1 4.5s 1.5s ease-in-out infinite",
        "wisp-5": "wisp2 3.2s 0.8s ease-in-out infinite",
      },
      keyframes: {
        chevronBounce: {
          "0%, 100%": { transform: "rotate(45deg) translateY(0)", opacity: "0.5" },
          "50%": { transform: "rotate(45deg) translateY(6px)", opacity: "1" },
        },
        loaderPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        fireGlow: {
          "0%": { backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%" },
          "33%": { backgroundSize: "110% 105%, 95% 110%, 105% 95%, 100% 108%, 100% 100%" },
          "66%": { backgroundSize: "95% 108%, 108% 95%, 92% 110%, 105% 100%, 100% 100%" },
          "100%": { backgroundSize: "105% 102%, 100% 105%, 110% 100%, 98% 105%, 100% 100%" },
        },
        embersFloat: {
          "0%": { transform: "translateY(0)", opacity: "0.6" },
          "50%": { transform: "translateY(-30px)", opacity: "1" },
          "100%": { transform: "translateY(-60px)", opacity: "0" },
        },
        sizzlerFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        wisp1: {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0" },
          "20%": { opacity: "0.6" },
          "100%": { transform: "translateY(-150px) scaleX(1.8) rotate(-10deg)", opacity: "0" },
        },
        wisp2: {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0" },
          "25%": { opacity: "0.5" },
          "100%": { transform: "translateY(-170px) scaleX(2) rotate(8deg)", opacity: "0" },
        },
        wisp3: {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0" },
          "15%": { opacity: "0.4" },
          "100%": { transform: "translateY(-130px) scaleX(1.5) rotate(-5deg)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
