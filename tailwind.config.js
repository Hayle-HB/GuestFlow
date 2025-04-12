/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fdf8e6",
          100: "#fbf1cc",
          200: "#f7e399",
          300: "#f3d566",
          400: "#efc733",
          500: "#d4af37", // Main gold color
          600: "#b38c2c",
          700: "#926a21",
          800: "#714716",
          900: "#50250b",
        },
      },
    },
  },
  plugins: [],
};
