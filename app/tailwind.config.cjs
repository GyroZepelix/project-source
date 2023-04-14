/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "text-highlight-2",
    "text-red-500",
    "hover:bg-red-500",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "grow-in": {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        "object-position-shift": {
          "0%": { objectPosition: "0% 0%" },
          "100%": { objectPosition: "100% 100%" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
        "fade-out": "fade-out 0.5s ease-in-out",
        "grow-in": "grow-in 0.15s ease-in-out",
      },
      colors: {
        primary: {
          0: "#010c1a",
          250: "#031722",
          350: "#051A25",
          500: "#061D28",
          750: "#0C2935",
          1000: "#174B5F"
        },
        main: "#FFFFFF",
        mainGray: "#b2c0c2",
        highlight: {
          0: "#F2A585",
          1: "#D35229",
          2: "#1ed482"
        }
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}
