import type { Config } from "tailwindcss";

const config = {
  mode: "jit",
  safelist: [
    "bg-black-100",
    "bg-white-100 border-2",
    "bg-red-600",
    "bg-yellow-400",
    "bg-green-600",
    "bg-blue-600",
    "bg-purple-600",
    "bg-red-400",
    "bg-yellow-200",
    "bg-green-300",
    "bg-cyan-400",
    "bg-violet-400",
  ],
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./constants/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        white: {
          100: "#FFFFFF",
          200: "#F7F7F7",
        },
        black: {
          100: "#000000",
        },
        primary: {
          100: "#5077F5",
        },
        secondary: {
          100: "#9A2CF6",
        },
        tertiary: {
          100: "#AF17F7",
        },
        scrim: {
          100: "#F0F0F0",
          200: "#E1E1E1",
          400: "#DADDE1",
          500: "#BBC0C8",
          600: "#9199A5",
        },
        link: {
          100: "#4285F4",
          200: "#3972D1",
        },
      },
      backgroundImage: {
        "bank-gradient": "linear-gradient(90deg, #0179FE 0%, #4893FF 100%)",
        "gradient-mesh": "url('/icons/gradient-mesh.svg')",
        "bank-green-gradient":
          "linear-gradient(90deg, #01797A 0%, #489399 100%)",
      },
      boxShadow: {
        form: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
      },
      boxShadowImg: {
        custom: "0 0 30px 30px rgba(0, 0, 0, 1)",
      },
      fontFamily: {
        helvetica: ["Helvetica", "Arial", "sans-serif"],
        didot: ["Didot", "serif"],
        bodoni: ["bodoni-urw", "serif"],
        baskerville: ["Baskerville", "serif"],
        garamond: ["Garamond", "serif"],
        times: ['"Times New Roman"', "serif"],
        lubalin: ['"ITC Lubalin Graph"', "serif"],
        newYork: ['"New York"', "serif"],
        minion: ["Minion", "serif"],
        georgia: ["Georgia", "serif"],
        futura: ["Futura", "serif"],
        avenir: ["Avenir", "serif"],
        montserrat: ["Montserrat", "serif"],
        frutiger: ["Frutiger", "serif"],
        newsGothic: ["News Gothic", "serif"],
        Gotham: ["Gotham", "serif"],
        Gilroy: ["Gilroy", "serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        fadeDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(var(--transition-height, -20px))",
          },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeUp: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": {
            opacity: "0",
            transform: "translateY(var(--transition-height, -20px))",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeDown: "fadeDown 0.4s ease-out",
        fadeUp: "fadeUp 0.4s ease-out",
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
} satisfies Config;

export default config;
