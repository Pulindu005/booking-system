/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"] ,
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#fdf7f0",
          100: "#f7efe6",
          200: "#efe0cf",
          300: "#e7d0b8",
          400: "#d9b895",
          500: "#c39b6e",
          600: "#9c7a52",
          700: "#6b4f2f",
          800: "#4a3622",
          900: "#2f2217"
        }
      },
      boxShadow: {
        soft: "0 18px 40px rgba(59, 33, 7, 0.12)",
        lift: "0 12px 24px rgba(59, 33, 7, 0.08)"
      }
    }
  },
  plugins: []
};
