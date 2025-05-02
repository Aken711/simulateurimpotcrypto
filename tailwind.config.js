/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1e1e2f",
        card: "#2a2a40",
        important: "#f1c232",
        textlight: "#f8f8f8",
      },
    },
  },
  plugins: [],
}


