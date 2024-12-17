/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{html,js}",
      "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
        colors: {
            frontier: '#00524F',
            explored: '#00E5E8',
            solution: '#E9260C',
            wall: '#04151f',
        }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}