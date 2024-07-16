/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-right": "fade-right 0.3s ease-out",
        "fade-left": "fade-left 0.3s ease-out",
        "show-component": "show-component 0.3s ease-out",
        "show-component2": "show-component 0.1s ease-out",
        "zoom-in": "zoom-in 0.5s ease-in",
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
        "show-component": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "show-component2": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "zoom-in": {
          "0%": { opacity: "0", transform: "scale(0)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        "no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".w-fulll": {
          width: "100vh",
        },
        ".h-98": {
          height: "647px",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
