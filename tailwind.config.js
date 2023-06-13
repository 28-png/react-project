/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'landing-page': "url('./src/assets/landingpagephoto1.jpg')",
      }
    },
  },
  plugins: [],
}


