import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        editorial: ["var(--font-inter)", "system-ui", "sans-serif"], // no editorial serif in Gold Traffic's system
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        // Gold Traffic — orange, ink, cool gray (see /public/brand for the
        // source kit: goldtraffic_hex.jpg gives FC4A02 / 1C1E21 / B6B9BF / F2F3F5)
        ivory: "#F2F3F5", // page background
        paper: "#FFFFFF", // elevated card background
        ink: {
          DEFAULT: "#1C1E21", // body text on light surfaces / inverted-surface base
          // Dark elevation ramp, derived from Ink #1C1E21 — reserved for the
          // hero and Hub Gold Traffic cinematic sections, never the whole page.
          950: "#1C1E21",
          900: "#222528",
          800: "#282B2F",
          700: "#303338",
          600: "#3A3E43",
          500: "#484D53",
        },
        sand: {
          DEFAULT: "#B6B9BF", // borders / cool accent — decorative only, fails AA as text
          dark: "#9296A0",
        },
        green: {
          // "green" kept as the token name for backward compatibility with
          // every bg-green/text-green call site — value is the brand orange.
          DEFAULT: "#C93B02", // primary / action / links — 4.6:1 on ivory (AA); the pure #FC4A02 mark stays reserved for the logo/icon assets themselves
          hover: "#AB3201",
          active: "#8C2801",
          tint: "#FEE2D7",
          subtle: "#FDCCB8",
          mist: "#F27A49", // accent on dark ink surfaces — 6:1 on ink (AA)
        },
        success: {
          DEFAULT: "#3E6B4E",
          mist: "#9EB5A6", // for use on dark ink surfaces
        },
        warning: "#D9A404", // Golden amber — kept visually distinct from the orange primary
        "warning-text": "#8A6E03", // darkened amber for warning copy on light surfaces
        danger: "#9B3D2E", // Terracota — 5.6:1 on ivory (AA pass, safe as error text)
      },
      letterSpacing: {
        tightish: "-0.01em",
        display: "-0.025em",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--base-ui-collapsible-panel-height, auto)" },
        },
        "accordion-up": {
          from: { height: "var(--base-ui-collapsible-panel-height, auto)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.25s cubic-bezier(0.22,1,0.36,1)",
        "accordion-up": "accordion-up 0.2s cubic-bezier(0.22,1,0.36,1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
