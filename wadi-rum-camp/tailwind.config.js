/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        beige: {
          50: "#fef5e7",
          100: "#fdebd0",
          200: "#f9e79f",
          300: "#f5b041",
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out",
        "slide-up": "slide-up 0.8s ease-out",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
}