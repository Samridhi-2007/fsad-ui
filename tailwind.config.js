/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#0f766e",
          hover: "#0d9488",
          muted: "#ccfbf1",
        },
        accent: {
          DEFAULT: "#f59e0b",
          hover: "#d97706",
        },
      },
    },
  },
  plugins: [],
};
