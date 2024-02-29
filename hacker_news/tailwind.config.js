/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#121212',
        'light-gray': '#333',
        'cyber-green': '#3fddc1',
        'highlight-red': '#ff4560',
        'digital-blue': '#4dc9ff',
      },
    },
  },
  plugins: [],
}
