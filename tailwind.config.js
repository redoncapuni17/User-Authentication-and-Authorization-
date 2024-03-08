/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-right": "fade-right 0.3s ease-out",
        "fade-left": "fade-left 0.3s ease-out",
      },
      keyframes: {
        "fade-right": {
          "0%": { opacity: "0", transform: "translate(-20px)" },
          "100%": { opacity: "1", transform: "translate(0)" },
        },
        "fade-left": {
          "0%": { opacity: "0", transform: "translate(-20px)" },
          "100%": { opacity: "1", transform: "translate(0)" },
        },
      },
    },
  },
  plugins: [],
};
