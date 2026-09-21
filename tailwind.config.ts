import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Rouge bordeaux signature MOLIERE (#CD071E)
          50: "#FFF1F2",
          100: "#FFE0E3",
          200: "#FFC6CC",
          300: "#FF9BA5",
          400: "#FB5C6B",
          500: "#F02E40",
          600: "#CD071E",
          700: "#B2061B",
          800: "#93091A",
          900: "#7A0D1B",
          950: "#42020A",
        },
        gold: {
          50: "#FBF6EC",
          100: "#F6EAD0",
          200: "#ECD29E",
          300: "#E2B868",
          400: "#D9A441",
          500: "#C2882E",
          600: "#A56A25",
          700: "#854E21",
          800: "#6F4021",
          900: "#5E3620",
          950: "#351C0F",
        },
        ink: {
          50: "#F6F6F8",
          100: "#ECECF1",
          150: "#E0E1EA",
          200: "#D5D6E0",
          250: "#C4C6D4",
          300: "#B0B2C4",
          400: "#8589A3",
          500: "#666A88",
          600: "#51546F",
          700: "#43455B",
          800: "#202029",
          900: "#14141B",
          950: "#0B0B0F",
        },
        cream: "#FAF7F2",
        whatsapp: {
          DEFAULT: "#25D366",
          dark: "#1DA851",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      spacing: {
        4.5: "1.125rem",
        8.5: "2.125rem",
        10.5: "2.625rem",
        12.5: "3.125rem",
        13: "3.25rem",
      },
      opacity: {
        8: "0.08",
        12: "0.12",
        14: "0.14",
        15: "0.15",
      },
      scale: {
        108: "1.08",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(11, 11, 15, 0.08)",
        card: "0 18px 50px -18px rgba(11, 11, 15, 0.25)",
        glow: "0 0 0 6px rgba(205, 7, 30, 0.12)",
        gold: "0 18px 50px -18px rgba(217, 164, 65, 0.45)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(1200px 600px at 80% -10%, rgba(217,164,65,0.22), transparent 60%), radial-gradient(900px 500px at 0% 100%, rgba(205,7,30,0.28), transparent 55%)",
        "brand-gradient":
          "linear-gradient(135deg, #CD071E 0%, #93091A 55%, #42020A 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #E2B868 0%, #D9A441 45%, #A56A25 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        float: "float 5s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite",
        marquee: "marquee 32s linear infinite",
        "ken-burns": "ken-burns 18s ease-out forwards",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
