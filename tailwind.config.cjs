/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home-background": "url('./assets/poke-game-background-2.jpg')",
        "game-background": "url('./assets/poke-game-background.jpg')"
      },
      backgroundSize: {
        "100vh" : "100vh"
      }
    },
  },
  plugins: [],
}
