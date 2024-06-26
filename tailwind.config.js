/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: { min: "100px", max: "640px" },
      md: { min: "641px", max: "1150px" },
    },
    extend: {},
  },
  plugins: [],
}