/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9",
        primaryDarker: "#075985",
        primaryLighter: "#38bdf8",
        bgcColor: "#242424"
      }
    },
  },
  plugins: [],
};
